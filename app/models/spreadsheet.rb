class Spreadsheet < ApplicationRecord
  belongs_to :user, optional: true
  has_many :items
  validates_presence_of :name, :currency

  def calculate_balance
    total = 0
    self.items.each { |i| i.is_expense ? total -= i.amount : total += i.amount }
    total
  end

  def calculate_item_type(item_type)
    total = 0
    self.items.each { |i| total += i.amount if i.item_type == item_type }
    total
  end

end
