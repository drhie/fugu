class Spreadsheet < ApplicationRecord
  belongs_to :user, optional: true
  has_many :items, dependent: :destroy
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

  def balance_in_readable_format(number)
    currency_mark = self.currency == "JPY" ? "¥" : "$"
    "#{number < 0 ? "-" : nil}#{currency_mark}#{ActiveSupport::NumberHelper.number_to_delimited(number.abs, delimiter: ",")}"
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

  def load_default_categories(categories)
    categories.each do |category|
      default_category = Category.where(name: category, user_id: self.user_id)
      self.categories << default_category
    end
  end

  def load_default_income(income)
  end

  def preview_settings
    items.destroy_all
    income = categories.find_or_create_by(user_id: user_id, name: "income")
    groceries = categories.find_or_create_by(user_id: user_id, name: "groceries")
    rent = categories.find_or_create_by(user_id: user_id, name: "rent")
    utilities = categories.find_or_create_by(user_id: user_id, name: "utilities")
    recreation = categories.find_or_create_by(user_id: user_id, name: "recreation")
    items.create([
      {user_id: user_id, name: "Person 1", amount: 100000, is_expense: false, transaction_date: Date.today, category: income},
      {user_id: user_id, name: "Person 2", amount: 70000, is_expense: false, transaction_date: Date.today, category: income},
      {user_id: user_id, name: "Walmart", amount: 5400, is_expense: true, transaction_date: Date.today, category: groceries},
      {user_id: user_id, name: "Costco", amount: 15400, is_expense: true, transaction_date: Date.today, category: groceries},
      {user_id: user_id, name: "Jesse's", amount: 8895, is_expense: true, transaction_date: Date.today, category: groceries},
      {user_id: user_id, name: "FamilyMart", amount: 1267, is_expense: true, transaction_date: Date.today, category: groceries},
      {user_id: user_id, name: "Monthly Rent", amount: 40400, is_expense: true, transaction_date: Date.today, category: rent},
      {user_id: user_id, name: "Water", amount: 4720, is_expense: true, transaction_date: Date.today, category: utilities},
      {user_id: user_id, name: "Gas", amount: 6300, is_expense: true, transaction_date: Date.today, category: utilities},
      {user_id: user_id, name: "Movies", amount: 2400, is_expense: true, transaction_date: Date.today, category: recreation},
      {user_id: user_id, name: "Art Museum", amount: 1400, is_expense: true, transaction_date: Date.today, category: recreation},
      {user_id: user_id, name: "Gym Membership", amount: 11400, is_expense: true, transaction_date: Date.today, category: recreation},
    ])
  end

  def self.delete_preview_sheets
    @spreadsheets = Spreadsheet.where(user_id: 0).where.not(id: 0)
    @spreadsheets.destroy_all
  end
end
