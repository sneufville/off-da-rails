class ApplicationController < ActionController::Base
  protect_from_forgery

  def session_check
    if user_signed_in?
      # try to retrieve the cart
      cart = CustomerOrder.includes(:customer_order_items).find_by(:user_id => current_user.id, :order_state => 0)
      cart_items = CustomerOrderItem.all.where(:customer_order_id => cart.id)
      puts "user signed in"
      {
        'current_user' => current_user,
        'user_profile' => nil,
        'cart' => cart,
        'cart_items' => cart_items
      }
    else
      puts "user not signed in"
      {
        'current_user' => nil,
        'user_profile' => nil,
        'cart' => nil,
        'cart_items' => []
      }
    end
  end

  inertia_share do
    session_check
  end

end
