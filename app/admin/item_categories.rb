# frozen_string_literal: true
ActiveAdmin.register ItemCategory do
  permit_params :category_name, :category_description
end
