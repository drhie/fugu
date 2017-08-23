require 'rails_helper'

RSpec.describe Item, type: :model do
  Spreadsheet.destroy_all
  Item.destroy_all

  spreadsheet = Spreadsheet.new(name: "example")
  spreadsheet.save!

  it "should have a spreadsheet loaded" do
    expect(Spreadsheet.all.length).to eq(1)
  end

  it "should create an item irrespective of user" do
    item = Item.new(
      name: "bananas",
      amount: 100,
      item_type: "cost",
      spreadsheet_id: spreadsheet.id
    )
    item.save!
    expect(Item.all.length).to eq(1)
  end


end
