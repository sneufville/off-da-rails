class Province < ApplicationRecord
  # validations
  validates :province, :abbreviation, presence: true
  validates :abbreviation, length: { is: 2 }

  # relationships
  # provinces to customer_profiles
  has_many :customer_profiles, dependent: :nullify
  # provinces to provincial taxes
  has_many :provincial_taxes, dependent: :nullify

  def display_name
    province
  end

  def self.ransackable_attributes(_auth_object = nil)
    %w[abbreviation created_at id id_value province updated_at]
  end

  def self.ransackable_associations(_auth_object = nil)
    %w[customer_profiles provincial_taxes]
  end
end
