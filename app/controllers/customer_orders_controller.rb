class CustomerOrdersController < ApplicationController
  before_action :authenticate_user!
  after_action :refresh_cart

  def cart
    cart = get_customer_cart
    cart_items = CustomerOrderItem.find_by(:customer_order_id => cart.id)
    render json: {
      customer_cart: cart,
      cart_items: cart_items ? cart_items : []
    }
  end

  def add_to_cart
    cart = get_customer_cart
    # permit_params = params.require(:customer_order).permit(:item_qty)
    # retrieve the item and prepare to add the relevant
    begin
      related_item = Item.find(params[:id])
    rescue ActiveRecordError::RecordNotFound
      return render json: {
        success: false,
        error: 'Related item not found'
      }
    end

    # retrieve tax entries
    tax_total = 0
    tax_entries = get_tax_entries
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

  # inertia cart refresher
  inertia_share do
    :refresh_cart
  end

  # cart related helper methods

  private

  def get_customer_cart
    @customer_cart = CustomerOrder.includes(:customer_order_items).find_or_create_by!(:user_id => current_user.id, :order_state => 0)
  end

  def get_customer_cart_items
    @cart_items = CustomerOrderItem.all.where(:customer_order_id => @customer_cart.id)
  end

  def refresh_cart
    puts "refresh cart data"
    {
      'cart' => @customer_cart,
      'cart_items' => @cart_items
    }
  end

  def customer_orders_items_params
    params.require(:customer_order_items).permit(:item_id, :item_qty)
  end

  def get_tax_entries
    @customer_profile = CustomerProfile.find_by(:user_id => current_user.id)

    begin
      if @customer_profile
           return ProvincialTax.find_by(:province_id => @customer_profile.province_id)
      else
        return []
      end
    rescue ActiveRecord::RecordNotFound
      return []
    end
  end
end
