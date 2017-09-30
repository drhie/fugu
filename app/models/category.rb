class Category < ApplicationRecord
  belongs_to :user
  validates_presence_of :name
  has_and_belongs_to_many :spreadsheets
end
