class Province < ApplicationRecord

  # validations
  validates :province, :abbreviation, presence: true
  validates :abbreviation, length: {is: 2}

  # relationships
  # provinces to customer_profiles
  has_many :customer_profiles
  # provinces to provincial taxes
  has_many :provincial_taxes
end
