class AddUniqueIndexes < ActiveRecord::Migration[7.1]
  def change
    add_index :about_pages, :page_title, unique: true
    add_index :contact_pages, :page_title, unique: true
  end
end
