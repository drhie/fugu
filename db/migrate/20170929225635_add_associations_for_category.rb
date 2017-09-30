class AddAssociationsForCategory < ActiveRecord::Migration[5.1]
  def up
    add_column :items, :category_id, :integer
    remove_column :items, :item_type
    add_column :categories, :spreadsheet_id, :integer
  end

  def down
    remove_column :items, :category_id
    add_column :items, :item_type, :string
    remove_column :categories, :spreadsheet_id
  end
end
