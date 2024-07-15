class AddIsAvailableToItems < ActiveRecord::Migration[7.1]
  def change
    add_column :items, :is_available, :boolean
  end
end
