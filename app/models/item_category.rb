class ItemCategory < ApplicationRecord
  # validations
  validates :category_name, :category_description, presence: true

  # relationships
  # item category to items
  has_many :items
end
