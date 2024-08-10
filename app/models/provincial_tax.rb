class ProvincialTax < ApplicationRecord
  # validations
  validates :tax_label, :tax_amt, presence: true
  validates :tax_amt, numericality: { greater_than_or_equal_to: 0 }

  # relationships
  belongs_to :province

  def self.ransackable_attributes(_auth_object = nil)
    ["created_at", "id", "id_value", "province_id", "tax_amt", "tax_label", "updated_at"]
  end

  def self.ransackable_associations(_auth_object = nil)
    ["province"]
  end
end
