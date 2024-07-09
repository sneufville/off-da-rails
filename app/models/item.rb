class Item < ApplicationRecord
  # validations
  validates :item_name, :item_description, :item_category_id, :item_cost, presence: true
  validates :item_cost, numericality: { greater_than_or_equal_to: 0 }

  # relationships
  belongs_to :item_category
  has_many :customer_order_items
end
