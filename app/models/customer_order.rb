class CustomerOrder < ApplicationRecord
  # validations
  validates :user_id, :order_state, presence: true
  validates :order_total, :order_item_count, :total_gst, :total_hst, :total_pst,
            numericality: { greater_than_or_equal_to: 0 }

  # relationships
  belongs_to :user
  has_many :customer_order_items, dependent: :nullify

  def display_name
    "Order #{id} for #{user.email}"
  end

  def self.ransackable_attributes(_auth_object = nil)
    %w[created_at customer_order_address id order_complete order_item_count order_state order_total
       total_gst total_hst total_pst transaction_id updated_at user_id]
  end

  def self.ransackable_associations(_auth_object = nil)
    %w[customer_order_items user]
  end
end
