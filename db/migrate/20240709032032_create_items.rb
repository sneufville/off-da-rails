class CreateItems < ActiveRecord::Migration[7.1]
  def change
    create_table :items do |t|
      t.string :item_name
      t.string :item_description
      t.integer :item_category_id
      t.integer :item_cost

      t.timestamps
    end
  end
end
