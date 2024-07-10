class AboutPage < ApplicationRecord
  validates :page_title, presence: true

  def self.ransackable_attributes(auth_object = nil)
    ["content", "created_at", "id", "id_value", "page_title", "updated_at"]
  end
end
