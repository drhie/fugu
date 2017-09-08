class Spreadsheet < ApplicationRecord
  belongs_to :user, optional: true
  has_many :items
  validates_presence_of :name, :currency

  def calculate_balance
    balance = {
      income: 0,
      expense: 0,
    }
    self.items.each { |i| i.is_expense ? balance[:expense] += i.amount : balance[:income] += i.amount }
    balance[:total] = balance[:income] - balance[:expense]
    balance
  end

  def calculate_item_type(item_type)
    total = 0
    self.items.each { |i| total += i.amount if i.item_type == item_type }
    total
  end

  def get_categories
    categories = []
    self.items.each do |i|
      unless i.item_type.downcase == "income"
        categories << i.item_type unless categories.include?(i.item_type)
      end
    end
    categories
  end

  def get_income
    income = []
    self.items.each do |i|
      income << {id: i.id, name: i.name, amount: i.amount, category: i.item_type} unless i.is_expense
    end
    income
  end

  def get_expenses
    expenses = {}
    self.items.each do |i|
      if i.is_expense
        if expenses.has_key?(i.item_type)
          expenses[i.item_type] << {id: i.id, name: i.name, amount: i.amount, category: i.item_type}
        else
          expenses[i.item_type] = [{id: i.id, name: i.name, amount: i.amount, category: i.item_type}]
        end
      end
    end
    expenses
  end

end
