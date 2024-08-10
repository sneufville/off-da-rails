class ItemCategory < ApplicationRecord
  # validations
  validates :category_name, :category_description, presence: true

  # relationships
  # item category to items
  has_many :items, dependent: :destroy

  def display_name
    category_name
  end

  def self.ransackable_attributes(_auth_object = nil)
    %w[category_description category_image_path category_name created_at id id_value updated_at]
  end

  def self.ransackable_associations(_auth_object = nil)
    ["items"]
  end
end
