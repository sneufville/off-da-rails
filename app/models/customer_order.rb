class CustomerOrder < ApplicationRecord
  # validations
  validates :user_id, :order_state, presence: true
  validates :order_total, :order_item_count, :total_gst, :total_hst, :total_pst, numericality: {greater_than_or_equal_to: 0}

  # relationships
  belongs_to :user
  has_many :customer_order_items
end
