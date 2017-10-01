class Item < ApplicationRecord
  belongs_to :spreadsheet, counter_cache: true, optional: true
  belongs_to :user, optional: true
  belongs_to :category
  validates_presence_of :name, :amount

end
