class Spreadsheet < ApplicationRecord
  belongs_to :user, optional: true
  has_many :items
  has_and_belongs_to_many :categories
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
    self.categories.where(name: category_name.downcase, user_id: self.user_id).first.id
  end

  def get_income
    self.items.where(category_id: self.categories.where(name: "income").first.id)
  end

  def get_expenses
    self.items.where.not(category_id: self.categories.where(name: "income").first.id)
  end

  def calculate_entire_balance
    total = 0
    Spreadsheet.where(user: self.user).each do |sprd|
      total += sprd.calculate_balance[:total] unless sprd == self
    end
    return total
  end

  def load_default_categories(categories)
    categories.each do |category|
      default_category = Category.where(name: category, user_id: self.user_id)
      self.categories << default_category
    end
  end

  def load_default_income(income)
  end
end
