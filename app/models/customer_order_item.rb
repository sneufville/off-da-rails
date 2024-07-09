class CustomerOrderItem < ApplicationRecord
  # validations
  validates :item_id, :order_id, :item_cost, :item_name, :item_qty, :item_total_cost, :tax_amt, presence: true
  validates :item_cost, :item_total_cost, :tax_amt, numericality: { greater_than_or_equal_to: 0 }
  validates :item_qty, numericality: { greater_than_or_equal_to: 1 }

  # relationships
  belongs_to :item
  belongs_to :customer_order
end
