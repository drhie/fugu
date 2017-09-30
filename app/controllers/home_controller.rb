class HomeController < ApplicationController
  def index
    @spreadsheets = Spreadsheet.where(user_id: current_user.id).order(created_at: :asc)
  end
end
