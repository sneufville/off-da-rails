class AboutPage < ApplicationRecord
  validates :page_title, uniqueness: true, presence: true

  def self.ransackable_attributes(_auth_object = nil)
    %w[content created_at id id_value page_title updated_at]
  end
end
