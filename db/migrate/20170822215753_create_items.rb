class CreateItems < ActiveRecord::Migration[5.0]
  def change
    create_table :items do |t|
      t.string :name
      t.integer :amount
      t.string :item_type
      t.integer :spreadsheet_id
      t.integer :user_id, optional: true

      t.timestamps
    end

  end
end
