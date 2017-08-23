class Spreadsheet < ApplicationRecord
  belongs_to :user, optional: true
  has_many :items
  validates_presence_of :name, :currency
end
