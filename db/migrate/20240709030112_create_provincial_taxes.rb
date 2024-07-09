class CreateProvincialTaxes < ActiveRecord::Migration[7.1]
  def change
    create_table :provincial_taxes do |t|
      t.integer :province_id
      t.string :tax_label
      t.integer :tax_amt

      t.timestamps
    end
  end
end
