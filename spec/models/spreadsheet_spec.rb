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

  end
end
