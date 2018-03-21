class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def spreadsheet_user
    current_user || User.find(0)
  end

  def check_if_preview
    unless current_user
      render json: ""
    end
  end
end
