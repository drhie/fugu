# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Category.create({
  name: "income"
})

@preview_user = User.create(id: 0, email: "guest@fugu", password: "password")
@spreadsheet = Spreadsheet.create(id: 0, user: @preview_user, name: "Preview", currency: "JPY")
