class ProvincialTax < ApplicationRecord
  # validations
  validates :tax_label, :tax_amt, presence: true
  validates :tax_amt, numericality: { greater_than_or_equal_to: 0, only_integer: true }

  # relationships
  belongs_to :province
end
