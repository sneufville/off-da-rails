# frozen_string_literal: true
ActiveAdmin.register Item do
  permit_params :item_name, :item_category_id, :item_description, :item_cost
end
