class CustomerOrdersController < ApplicationController
  before_action :authenticate_user!

  def cart
    cart = get_customer_cart
    cart_items = CustomerOrderItem.find_by(:customer_order_id => cart.id)
    render json: {
      customer_cart: cart,
      cart_items: cart_items ? cart_items : []
    }
  end

  # cart related helper methods
  private
  def get_customer_cart
    @customer_cart = CustomerOrder.includes(:customer_order_items).find_or_create_by!(:user_id => current_user.id, :order_state => 0)
  end
end
