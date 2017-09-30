class CategoriesSpreadsheets < ActiveRecord::Migration[5.1]
  def change
    create_table :categories_spreadsheets, id: false do |t|
      t.integer   :category_id
      t.integer   :spreadsheet_id
    end

    remove_column :categories, :spreadsheet_id
  end
end
