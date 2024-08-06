class CustomerProfile < ApplicationRecord
  # validations
  validates :user_id, :province_id, presence: true

  # relationships
  belongs_to :province
  belongs_to :user
end
