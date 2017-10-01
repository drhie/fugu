class HomeController < ApplicationController
  def index
    if current_user
      @spreadsheets = Spreadsheet.where(user_id: current_user.id).order(created_at: :asc)
    end
  end
end
