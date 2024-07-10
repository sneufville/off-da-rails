# frozen_string_literal: true
ActiveAdmin.register AboutPage do
  permit_params :page_title, :content
end
