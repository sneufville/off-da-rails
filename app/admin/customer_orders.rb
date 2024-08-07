# frozen_string_literal: true
ActiveAdmin.register CustomerOrder do
  permit_params :user_id
end
