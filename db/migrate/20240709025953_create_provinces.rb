class CreateProvinces < ActiveRecord::Migration[7.1]
  def change
    create_table :provinces do |t|
      t.string :province
      t.string :abbreviation

      t.timestamps
    end
  end
end
