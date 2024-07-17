class CustomerOrdersController < ApplicationController
  before_action :authenticate_user!

  def cart
    render json: {
      customer_cart: get_customer_cart
    }
  end
  
  # cart related helper methods
  private
  def get_customer_cart
    @customer_cart = CustomerOrder.find_or_create_by!(:user_id => current_user.id, :order_state => 0)
  end
end
