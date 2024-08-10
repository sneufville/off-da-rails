class CustomerOrderItem < ApplicationRecord
  # validations
  validates :item_id, :customer_order_id, :item_cost, :item_name, :item_qty, :item_total_cost,
            presence: true
  validates :item_cost, :item_total_cost, :hst_amt, :pst_amt, :gst_amt,
            numericality: { greater_than_or_equal_to: 0 }
  validates :item_qty, numericality: { greater_than_or_equal_to: 1 }

  # relationships
  belongs_to :item
  belongs_to :customer_order

  def display_name
    item_name
  end

  def self.ransackable_attributes(_auth_object = nil)
    %w[created_at id id_value item_cost item item_name item_qty item_total_cost order_id hst_amt
       gst_amt pst_amt updated_at]
  end

  def self.ransackable_associations(_auth_object = nil)
    %w[customer_order item]
  end
end
