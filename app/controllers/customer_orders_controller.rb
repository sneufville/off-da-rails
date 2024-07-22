class CustomerOrdersController < ApplicationController
  before_action :authenticate_user!, :get_customer_cart, :get_customer_cart_items
  after_action :refresh_cart

  # -- Normal Views --
  def customer_cart

    render inertia: 'CustomerOrders/CustomerCart'
  end

  def checkout_customer_cart

    render inertia: 'CustomerOrders/CustomerCheckout'
  end

  # -- API Routes --
  def api_cart
    cart = get_customer_cart
    cart_items = CustomerOrderItem.find_by(:customer_order_id => cart.id)
    render json: {
      customer_cart: cart,
      cart_items: cart_items ? cart_items : []
    }
  end

  def api_add_to_cart
    cart = get_customer_cart
    # permit_params = params.require(:customer_order).permit(:item_qty)
    # retrieve the item and prepare to add the relevant
    begin
      related_item = Item.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      return render json: {
        success: false,
        error: 'Related item not found'
      }
    end

    # retrieve tax entries
    tax_total = 0
    tax_entries = get_tax_entries

    puts tax_entries.inspect
    # if no tax entries, return an error to tell the user to create a profile
    unless tax_entries || tax_entries.length < 1
      return render json: {
        success: false,
        error: 'Profile not setup yet.'
      }, status: :bad_request
    end

    tax_entries.each do |entry|
      tax_total += entry.tax_amt
    end
    tax_amount = related_item.item_cost * tax_total / 100

    # check if the item is already in the cart (customer_order_items table)
    order_item = CustomerOrderItem.find_by(:customer_order_id => cart.id, :item_id => related_item.id)

    if order_item
      order_item.item_qty += 1
      cart.order_total += (related_item.item_cost + tax_amount)
    else
      order_item = CustomerOrderItem.new(
        :customer_order_id => cart.id,
        :item_id => related_item.id,
        :item_name => related_item.item_name,
        :item_qty => 1,
        :item_cost => related_item.item_cost,
        :tax_amt => tax_amount,
        :item_total_cost => related_item.item_cost + tax_amount
      )
      cart.order_total += (related_item.item_cost + tax_amount) * 100
    end

    cart.order_item_count += 1
    unless cart.save
      return render json: {
        success: false,
        message: 'Failed to update cart'
      }
    end

    if order_item.save
      render json: {
        success: true,
        message: 'Item added to cart'
      }, status: :created
    else
      render json: {
        success: false,
        message: 'Item was not added',
      }, status: :bad_request
    end
  end

  def api_update_cart_item_qty
    cart = get_customer_cart

    # cart item
    begin
      related_cart_item = CustomerOrderItem.find_by(:customer_order_id => cart.id, :id => params[:id])
    rescue ActiveRecord::RecordNotFound
      return render json: {
        success: false,
        message: 'Item not found'
      }, status: :not_found
    end

    _params = customer_orders_items_params

    if _params['item_qty'] == 0
      return render json: {
        success: false,
        message: 'Invalid quantity set'
      }
    end

    tax_entries = get_tax_entries
    tax_percentage = 0
    tax_entries.each do |entry|
      tax_percentage += entry.tax_amt
    end
    item_tax_amount = related_cart_item.item.item_cost * (tax_percentage * 100)
    related_cart_item.item_qty = _params['item_qty']
    related_cart_item.item_cost = related_cart_item.item.item_cost
    related_cart_item.tax_amt = item_tax_amount
    related_cart_item.item_total_cost = (related_cart_item.item_cost + item_tax_amount) * _params['item_qty']
    related_cart_item.save

    render json: {
      success: true,
      message: 'Cart updated.'
    }

  end

  def api_delete_from_cart
    cart = get_customer_cart
    begin
      related_item = Item.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      return render json: {
        success: false,
        message: 'Item not found'
      }
    end

    # look up item in cart
    cart_item = CustomerOrderItem.find_by(:id => related_item.id, :customer_order_id => cart.id)
    unless cart_item
      return render json: {
        success: false,
        message: 'Item was not found in cart'
      }
    end

    cart_item.destroy
    # todo: recalculate totals

    render json: {
      success: true,
      message: 'Item removed. Your cart has been updated'
    }
  end

  # inertia cart refresher
  inertia_share do
    {
      'cart' => @customer_cart,
      'cart_items' => @cart_items
    }
  end

  # cart related helper methods

  private

  def get_customer_cart
    @customer_cart = CustomerOrder.includes(:customer_order_items).find_or_create_by!(:user_id => current_user.id, :order_state => 0)
  end

  def get_customer_cart_items
    @cart_items = CustomerOrderItem.all.where(:customer_order_id => @customer_cart.id)
  end

  def recalculate_cart_total
    cart = get_customer_cart
    cart_items = get_customer_cart_items

    cart_total = 0
    item_count = 0
    if cart_items.length > 0
      cart_items.each do |item|
        item_count += item.item_qty
      end
    end

    cart.order_total = cart_total
    cart.order_item_count = item_count
    cart.save
  end

  def refresh_cart
    puts "refresh cart data"
    # {
    #   'cart' => @customer_cart,
    #   'cart_items' => @cart_items
    # }
  end

  def customer_orders_items_params
    params.require(:customer_order_items).permit(:item_id, :item_qty)
  end

  def get_tax_entries
    @customer_profile = CustomerProfile.find_by(:user_id => current_user.id)

    if @customer_profile
      begin
        ProvincialTax.all.where(:province_id => @customer_profile.province_id)
      rescue ActiveRecord::RecordNotFound
        []
      end
    else
      []
    end
  end
end
