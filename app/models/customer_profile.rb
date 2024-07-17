class CustomerProfile < ApplicationRecord
  # validations
  validates :user_id, :first_name, :last_name, :street_address_1, :street_address_2, :city, :province_id, :country, :phone_number, presence: true

  # relationships
  belongs_to :province
  belongs_to :user
end
