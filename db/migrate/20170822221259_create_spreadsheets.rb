class CreateSpreadsheets < ActiveRecord::Migration[5.0]
  def change
    create_table :spreadsheets do |t|
      t.string :name
      t.integer :user, optional: true

      t.timestamps
    end
  end
end
