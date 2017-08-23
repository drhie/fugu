class Item < ApplicationRecord
  belongs_to :spreadsheet, counter_cache: true
  belongs_to :user, optional: true
end
