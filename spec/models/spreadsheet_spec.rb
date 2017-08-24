require 'rails_helper'

RSpec.describe Spreadsheet, type: :model do
  user = User.new(email: "example@example.com", password: "123456")
  user.save!

  context "With a loaded up user" do

    it "should be able to create a spreadsheet with and without user" do
      s1 = Spreadsheet.create(name: "example", currency: "JPY", user_id: user.id)
      s2 = Spreadsheet.create(name: "example2", currency: "CAD")
      expect(Spreadsheet.all.length).to eq(2)
      expect(user.spreadsheets.length).to eq(1)
    end

    it "should calculate the total balance of a spreadsheet" do
      s1 = Spreadsheet.create(name: "example", currency: "JPY", user_id: user.id)
      i1 = Item.create(name: "bananas", amount: 100, item_type: "grocery", is_expense: true, spreadsheet_id: s1.id)
      i2 = Item.create(name: "george", amount: 4000, item_type: "income", is_expense: false, spreadsheet_id: s1.id)
      i3 = Item.create(name: "apples", amount: 300, item_type: "grocery", is_expense: true, spreadsheet_id: s1.id)
      i4 = Item.create(name: "janet", amount: 2000, item_type: "income", is_expense: false, spreadsheet_id: s1.id)
      expect(s1.calculate_balance).to eq(5600)
    end

    it "should calculate only one type of item on the spreadsheet" do
      s1 = Spreadsheet.create(name: "example", currency: "JPY", user_id: user.id)
      i1 = Item.create(name: "bananas", amount: 200, item_type: "grocery", is_expense: true, spreadsheet_id: s1.id)
      i2 = Item.create(name: "water", amount: 300, item_type: "utilities", is_expense: true, spreadsheet_id: s1.id)
      i3 = Item.create(name: "apples", amount: 350, item_type: "grocery", is_expense: true, spreadsheet_id: s1.id)
      i4 = Item.create(name: "janet", amount: 2000, item_type: "income", is_expense: false, spreadsheet_id: s1.id)
      expect(s1.calculate_item_type("grocery")).to eq(550)
      expect(s1.calculate_item_type("income")).to eq(2000)
    end

  end
end
