class CreateCustomerOrderItems < ActiveRecord::Migration[7.1]
  def change
    create_table :customer_order_items do |t|
      # t.integer :item_id
      t.references :item, null: false, foreign_key: true
      # t.integer :order_id
      t.belongs_to :customer_order, null: false, foreign_key: true
      t.decimal :item_cost
      t.string :item_name
      t.integer :item_qty
      # t.integer :tax_amt
      t.decimal :item_total_cost
      t.decimal :hst_amt, default: 0
      t.decimal :gst_amt, default: 0
      t.decimal :pst_amt, default: 0

      t.timestamps
    end
  end
end
