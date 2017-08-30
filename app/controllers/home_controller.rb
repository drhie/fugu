class HomeController < ApplicationController
  def index
    @items = Item.all
    @spreadsheets = Spreadsheet.all
    @spreadsheet = Spreadsheet.first
  end
end
