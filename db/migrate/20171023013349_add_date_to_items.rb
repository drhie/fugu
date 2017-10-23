class AddDateToItems < ActiveRecord::Migration[5.1]
  def change
    add_column :items, :transaction_date, :date, optional: true
    add_column :items, :comment, :string, optional: true
  end
end
