class RenameOrderIdToCustomerOrderId < ActiveRecord::Migration[7.1]
  def change
    # rename_column :customer_order_items, :order_id, :customer_order_id
  end
end
