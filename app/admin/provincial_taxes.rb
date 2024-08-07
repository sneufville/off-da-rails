# frozen_string_literal: true
ActiveAdmin.register ProvincialTax do
  permit_params :tax_label, :tax_amount
end
