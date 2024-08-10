class ContactPage < ApplicationRecord
  validates :page_title, uniqueness: true, presence: true

  def self.ransackable_attributes(_auth_object = nil)
    %w[contact_email_address contact_phone_number content created_at id id_value page_title
       updated_at]
  end
end
