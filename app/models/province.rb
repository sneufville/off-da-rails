class Province < ApplicationRecord

  # validations
  validates :province, :abbreviation, presence: true
  validates :abbreviation, length: {is: 2}

  # relationships
  # provinces to customer_profiles
  has_many :customer_profiles
  # provinces to provincial taxes
  has_many :provincial_taxes

  def display_name
    province
  end

  def self.ransackable_attributes(auth_object = nil)
    ["abbreviation", "created_at", "id", "id_value", "province", "updated_at"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["customer_profiles", "provincial_taxes"]
  end
end
