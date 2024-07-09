class CreateItemCategories < ActiveRecord::Migration[7.1]
  def change
    create_table :item_categories do |t|
      t.string :category_name
      t.string :category_description
      t.string :category_image_path

      t.timestamps
    end
  end
end
