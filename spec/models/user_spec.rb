require 'rails_helper'

RSpec.describe User, type: :model do
  it "should be able to create a user" do
    user = User.create(email: "example@example.com", password: "123456")
    expect(User.all.length).to eq(1)
  end
end
