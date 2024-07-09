class CreateCustomerProfiles < ActiveRecord::Migration[7.1]
  def change
    create_table :customer_profiles do |t|
      t.integer :customer_id
      t.string :first_name
      t.string :last_name
      t.string :phone_number
      t.string :street_address_1
      t.string :street_address_2
      t.string :city
      t.integer :province_id
      t.string :country

      t.timestamps
    end
  end
end
