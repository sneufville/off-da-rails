class CreateCustomerOrders < ActiveRecord::Migration[7.1]
  def change
    create_table :customer_orders do |t|
      t.integer :customer_id
      t.integer :order_total
      t.integer :order_item_count
      t.string :transaction_id
      t.integer :order_state
      t.boolean :order_complete

      t.timestamps
    end
  end
end
