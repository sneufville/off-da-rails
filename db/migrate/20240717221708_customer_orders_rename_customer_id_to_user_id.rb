class CustomerOrdersRenameCustomerIdToUserId < ActiveRecord::Migration[7.1]
  def change
    rename_column :customer_orders, :customer_id, :user_id
  end
end
