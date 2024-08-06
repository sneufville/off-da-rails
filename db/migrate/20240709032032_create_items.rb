class CreateItems < ActiveRecord::Migration[7.1]
  def change
    create_table :items do |t|
      t.string :item_name
      t.string :item_description
      t.references :item_category, null: false, foreign_key: true
      t.decimal :item_cost

      t.timestamps
    end
  end
end
