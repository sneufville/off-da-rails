class CustomerProfile < ApplicationRecord
  # validations
  validates :user_id, :province_id, presence: true

  # relationships
  belongs_to :province
  belongs_to :user

  def self.ransackable_attributes(auth_object = nil)
    ["city", "country", "created_at", "first_name", "id", "id_value", "last_name", "phone_number", "province_id", "street_address_1", "street_address_2", "updated_at", "user_id"]
  end
end
