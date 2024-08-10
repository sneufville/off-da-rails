class CustomerOrdersController < ApplicationController
  before_action :authenticate_user!, :get_customer_cart, :get_customer_cart_items, :get_profile
  after_action :refresh_cart, :recalculate_cart_total

  # -- Normal Views --
  def customer_cart
    render inertia: "CustomerOrders/CustomerCart"
  end

  def checkout_customer_cart
    provinces = Province.all
    render inertia: "CustomerOrders/CustomerCheckout", props: {
      provinces:
    }
  end

  def customer_orders
    orders = CustomerOrder.includes(:customer_order_items).where(user_id:     current_user.id,
                                                                 order_state: 1)
    order_items_collection = {}

    orders.each do |order|
      order_items_collection[order.id] = order.customer_order_items
    end

    render inertia: "CustomerOrders/CustomerOrders", props: {
      orders:,
      order_items_collection:
    }
  end

  # -- API Routes --
  def api_cart
    cart = get_customer_cart
    cart_items = CustomerOrderItem.find_by(customer_order_id: cart.id)
    render json: {
      customer_cart: cart,
      cart_items:    cart_items || []
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
        error:   "Related item not found"
      }
    end

    # retrieve tax entries
    tax_total = 0.00
    tax_entries = get_tax_entries

    puts tax_entries.inspect
    # if no tax entries, return an error to tell the user to create a profile
    if tax_entries.length < 1
      return render json: {
        success: false,
        error:   "Profile not setup yet.",
        code:    "ERR_NO_PROFILE"
      }, status: :bad_request
    end

    hst_tax = 0.0
    gst_tax = 0.0
    pst_tax = 0.0
    tax_entries.each do |entry|
      tax_total += entry.tax_amt
      gst_tax = entry.tax_amt if entry.tax_label == "gst"
      hst_tax = entry.tax_amt if entry.tax_label == "hst"
      pst_tax = entry.tax_amt if entry.tax_label == "pst"
    end
    hst_amount = related_item.item_cost * hst_tax
    gst_amount = related_item.item_cost * gst_tax
    pst_amount = related_item.item_cost * pst_tax
    total_tax_amount = hst_amount + gst_amount + pst_amount

    # check if the item is already in the cart (customer_order_items table)
    order_item = CustomerOrderItem.find_by(customer_order_id: cart.id,
                                           item_id:           related_item.id)

    if order_item
      order_item.item_qty += 1
      cart.order_total += (related_item.item_cost + total_tax_amount)
    else
      order_item = CustomerOrderItem.new(
        customer_order_id: cart.id,
        item_id:           related_item.id,
        item_name:         related_item.item_name,
        item_qty:          1,
        item_cost:         related_item.item_cost,
        hst_amt:           hst_amount,
        gst_amt:           gst_amount,
        pst_amt:           pst_amount,
        item_total_cost:   related_item.item_cost + total_tax_amount
      )
      cart.order_total += (related_item.item_cost + total_tax_amount)
    end

    cart.order_item_count += 1
    unless cart.save
      return render json: {
        success: false,
        message: "Failed to update cart"
      }
    end

    if order_item.save
      render json: {
        success: true,
        message: "Item added to cart"
      }, status: :created
    else
      render json: {
        success: false,
        message: "Item was not added"
      }, status: :bad_request
    end
  end

  def api_update_cart_item_qty
    cart = get_customer_cart

    # cart item
    begin
      related_cart_item = CustomerOrderItem.find_by(customer_order_id: cart.id,
                                                    id:                params[:id])
    rescue ActiveRecord::RecordNotFound
      return render json: {
        success: false,
        message: "Item not found"
      }, status: :not_found
    end

    _params = customer_orders_items_params

    if _params["item_qty"] == 0
      return render json: {
        success: false,
        message: "Invalid quantity set"
      }
    end

    tax_entries = get_tax_entries

    if tax_entries.length < 1
      return render json: {
        success: false,
        error:   "Profile not setup yet.",
        code:    "ERR_NO_PROFILE"
      }, status: :bad_request
    end

    gst_tax = BigDecimal(0.00)
    hst_tax = BigDecimal(0.00)
    pst_tax = BigDecimal(0.00)
    tax_entries.each do |entry|
      gst_tax = entry.tax_amt if entry.tax_label == "gst"
      hst_tax = entry.tax_amt if entry.tax_label == "hst"
      pst_tax = entry.tax_amt if entry.tax_label == "pst"
    end

    gst_amount = related_cart_item.item.item_cost * gst_tax * _params["item_qty"]
    hst_amount = related_cart_item.item.item_cost * hst_tax * _params["item_qty"]
    pst_amount = related_cart_item.item.item_cost * pst_tax * _params["item_qty"]

    item_tax_amount = gst_amount + hst_amount + pst_amount
    related_cart_item.item_qty = _params["item_qty"]
    related_cart_item.item_cost = related_cart_item.item.item_cost
    related_cart_item.gst_amt = gst_amount
    related_cart_item.hst_amt = hst_amount
    related_cart_item.pst_amt = pst_amount
    related_cart_item.item_total_cost = (related_cart_item.item_cost * _params["item_qty"]) + item_tax_amount
    related_cart_item.save

    render json: {
      success: true,
      message: "Cart updated."
    }
  end

  def api_delete_from_cart
    cart = get_customer_cart
    begin
      related_item = Item.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      return render json: {
        success: false,
        message: "Item not found"
      }
    end

    # look up item in cart
    cart_item = CustomerOrderItem.find_by(id: related_item.id, customer_order_id: cart.id)
    unless cart_item
      return render json: {
        success: false,
        message: "Item was not found in cart"
      }
    end

    cart_item.destroy
    # TODO: recalculate totals

    render json: {
      success: true,
      message: "Item removed. Your cart has been updated"
    }
  end

  def api_place_customer_order
    refresh_cart
    # cart = get_customer_cart
    begin
      # place order
      if @customer_profile.nil?
        return render json: {
          success: false,
          message: "Profile not setup",
          code:    "ERR_NO_PROFILE"
        }
      end

      customer_address_information = [
        @customer_profile.street_address_1,
        @customer_profile.street_address_2,
        @customer_profile.city,
        @customer_profile.province.abbreviation,
        @customer_profile.country
      ].join(" ").strip
      @customer_cart.customer_order_address = customer_address_information
      @customer_cart.order_state = 1
      @customer_cart.order_complete = true

      if @customer_cart.save
        render json: {
          success: true,
          message: "Order placed",
          code:    "SUCCESS_ORDER_PLACED",
          data:    @customer_cart.to_json
        }
      else
        render json: {
          success: false,
          message: "Unable to place order",
          code:    "ERR_ORDER_FAILED"
        }
      end
    end
  end

  # inertia cart refresher
  inertia_share do
    {
      "cart"       => @customer_cart,
      "cart_items" => @cart_items
    }
  end

  # cart related helper methods

  private

  def get_customer_cart
    @customer_cart = CustomerOrder.includes(:customer_order_items).find_or_create_by!(
      user_id: current_user.id, order_state: 0
    )
  end

  def get_customer_cart_items
    @cart_items = CustomerOrderItem.all.where(customer_order_id: @customer_cart.id)
  end

  def recalculate_cart_total
    cart = get_customer_cart
    cart_items = get_customer_cart_items
    tax_entries = get_tax_entries

    gst_tax = 0.00
    hst_tax = 0.00
    pst_tax = 0.00
    tax_entries.each do |entry|
      gst_tax = entry.tax_amt if entry.tax_label == "gst"
      hst_tax = entry.tax_amt if entry.tax_label == "hst"
      pst_tax = entry.tax_amt if entry.tax_label == "pst"
    end

    # update customer order - recalculate

    cart_total = 0
    item_count = 0
    total_gst_amount = 0
    total_hst_amount = 0
    total_pst_amount = 0
    if cart_items.length > 0
      cart_items.each do |item|
        item_count += item.item_qty
        cart_total += item.item_qty * item.item_cost
        total_gst_amount += item.item_qty * item.item_cost * gst_tax
        total_hst_amount += item.item_qty * item.item_cost * hst_tax
        total_pst_amount += item.item_qty * item.item_cost * pst_tax
      end
    end

    cart.order_total = cart_total + total_pst_amount + total_hst_amount + total_gst_amount
    cart.total_gst = total_gst_amount
    cart.total_hst = total_hst_amount
    cart.total_pst = total_pst_amount
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

  def get_profile
    @customer_profile = CustomerProfile.find_by(user_id: current_user.id)
  end

  def customer_orders_items_params
    params.require(:customer_order_items).permit(:item_id, :item_qty)
  end

  def get_tax_entries
    @customer_profile = CustomerProfile.find_by(user_id: current_user.id)

    if @customer_profile
      begin
        ProvincialTax.all.where(province_id: @customer_profile.province_id)
      rescue ActiveRecord::RecordNotFound
        []
      end
    else
      []
    end
  end
end
