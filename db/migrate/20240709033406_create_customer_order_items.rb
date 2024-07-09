class CreateCustomerOrderItems < ActiveRecord::Migration[7.1]
  def change
    create_table :customer_order_items do |t|
      t.integer :item_id
      t.integer :order_id
      t.integer :item_cost
      t.string :item_name
      t.integer :item_qty
      t.integer :tax_amt
      t.integer :item_total_cost

      t.timestamps
    end
  end
end
