class Spreadsheet < ApplicationRecord
  belongs_to :user, optional: true
  has_many :items
  has_many :categories
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

  def calculate_item_type(category_number)
    total = 0
    self.items.each { |i| total += i.amount if i.category_id == category_number }
    total
  end

  def get_categories
    self.categories.map { |i| i.name }
  end

  def set_category(category_name)
    self.categories.where(name: category_name).first.id
  end

  def get_income
    self.items.where(category_id: self.categories.where(name: "income").first.id)
  end

  def get_expenses
    self.items.where.not(category_id: self.categories.where(name: "income").first.id)
  end
end
