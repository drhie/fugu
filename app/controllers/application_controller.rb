class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :preview_user

  def current_user
    current_user ||= User.find(0)
  end

  def preview_user
    current_user.id == 0 ? true : false
  end

  def check_if_preview
    unless current_user
      render json: ""
    end
  end
end
