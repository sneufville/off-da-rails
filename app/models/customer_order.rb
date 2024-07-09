class CustomerOrder < ApplicationRecord
  # validations
  validates :customer_id, :order_total, :order_item_count, :transaction_id, :order_state, presence: true

  # relationships
  belongs_to :user
  has_many :customer_order_items
end
