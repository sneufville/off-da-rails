# frozen_string_literal: true
ActiveAdmin.register ContactPage do
  permit_params :page_title, :content, :contact_email_address, :contact_phone_number
end
