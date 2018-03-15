class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def check_if_preview
    unless current_user
      render json: ""
    end
  end
end
