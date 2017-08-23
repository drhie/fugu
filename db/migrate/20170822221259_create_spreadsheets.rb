class CreateSpreadsheets < ActiveRecord::Migration[5.0]
  def change
    create_table :spreadsheets do |t|
      t.string :name
      t.integer :user_id
      t.integer :items_count, default: 0

      t.timestamps
    end
  end
end
