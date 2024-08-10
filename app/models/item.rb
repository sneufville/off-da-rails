class Item < ApplicationRecord
  paginates_per 20

  # validations
  validates :item_name, :item_description, :item_category_id, :item_cost, presence: true
  validates :item_cost, numericality: { greater_than_or_equal_to: 0 }
  # validates :item_image, blob: { content_type: ['image/png', 'image/jpg', 'image/jpeg'], size_range: 1..(5.megabytes) }

  # relationships
  belongs_to :item_category
  has_many :customer_order_items
  has_one_attached :item_image

  def display_name
    item_name
  end

  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "id", "id_value", "item_category_id", "item_cost", "item_description", "item_name", "updated_at", "is_available"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["customer_order_items", "item_category"]
  end
end
