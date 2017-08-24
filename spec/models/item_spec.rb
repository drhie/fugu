require 'rails_helper'

RSpec.describe Item, type: :model do

  context "With spreadsheet loaded" do

    it "should have an existing spreadsheet to be added onto" do
      s1 = Spreadsheet.new(name: "example", currency: "JPY")
      s1.save!
      expect(Spreadsheet.all.length).to eq(1)
    end

    it "should create an item on spreadsheet irrespective of user" do
      s1 = Spreadsheet.create(name: "example", currency: "JPY")
      item = Item.new(
        name: "bananas",
        amount: 100,
        item_type: "grocery",
        is_expense: true,
        spreadsheet_id: s1.id
      )
      item.save!
      expect(Item.all.length).to eq(1)
    end

  end

end
