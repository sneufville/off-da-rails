class CreateCustomerOrders < ActiveRecord::Migration[7.1]
  def change
    create_table :customer_orders do |t|
      t.references :user, null: false, foreign_key: true
      t.decimal :order_total
      t.integer :order_item_count
      t.string :transaction_id
      t.integer :order_state
      t.boolean :order_complete
      t.decimal :total_gst, default: 0
      t.decimal :total_pst, default: 0
      t.decimal :total_hst, default: 0
      t.string :customer_order_address

      t.timestamps
    end
  end
end
