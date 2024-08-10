# frozen_string_literal: true
ActiveAdmin.register Item do
  permit_params :item_name, :item_category_id, :item_description, :item_cost, :item_image
  remove_filter :item_image_attachment, :item_image_blob

  form do |f|
    f.inputs "Item Details" do
      f.input :item_name
      f.input :item_description
      f.input :item_category_id
      f.input :item_cost
      f.input :item_image, as: :file
    end
    f.actions
  end

  show do
    attributes_table do
      row :item_name
      row :item_category_id
      row :item_description
      row :item_cost
      row :item_image do |item|
        if item.item_image.attached?
          image_tag url_for(item.item_image), size: "100x100"
        else
          "No image for this item"
        end
      end
    end
  end
end
