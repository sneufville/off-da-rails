class ChangeCustomerOrdersDefaults < ActiveRecord::Migration[7.1]
  def change
    change_column_default :customer_orders, :order_total, 0
    change_column_default :customer_orders, :order_item_count, 0
  end
end
