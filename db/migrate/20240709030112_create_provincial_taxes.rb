class CreateProvincialTaxes < ActiveRecord::Migration[7.1]
  def change
    create_table :provincial_taxes do |t|
      t.string :tax_label
      t.decimal :tax_amt
      t.references :province, null: false, foreign_key: true

      t.timestamps
    end
  end
end
