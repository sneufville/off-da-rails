class CustomerOrderItem < ApplicationRecord
  # validations
  validates :item_id, :customer_order_id, :item_cost, :item_name, :item_qty, :item_total_cost, :tax_amt, presence: true
  validates :item_cost, :item_total_cost, :tax_amt, numericality: { greater_than_or_equal_to: 0 }
  validates :item_qty, numericality: { greater_than_or_equal_to: 1 }

  # relationships
  belongs_to :item
  belongs_to :customer_order

  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "id", "id_value", "item_cost", "item_id", "item_name", "item_qty", "item_total_cost", "order_id", "tax_amt", "updated_at"]
  end
end
