class CreateContactPages < ActiveRecord::Migration[7.1]
  def change
    create_table :contact_pages do |t|
      t.string :contact_email_address
      t.string :contact_phone_number
      t.text :content
      t.string :page_title

      t.timestamps
    end
  end
end
