# frozen_string_literal: true
ActiveAdmin.register CustomerOrderItem do
  permit_params  :item_cost, :customer_order_item_id, :item_name, :item_qty, :item_total_cost, :order_id, :hst_amt, :gst_amt, :pst_amt
end
