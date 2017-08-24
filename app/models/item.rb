class Item < ApplicationRecord
  belongs_to :spreadsheet, counter_cache: true
  belongs_to :user, optional: true
  validates_presence_of :name, :amount, :item_type
end
