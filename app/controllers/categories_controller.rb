class CategoriesController < ApplicationController
  def index
    @index = {}
    Category.all.map { |e| @index[e.id] = e.name  if e.user_id == current_user.id }
    render json: @index
  end

  def create
    @category = Category.new(category_params)
    @category.user_id = current_user.id if current_user
    @category.save
  end

  def show
    @category = Category.find(params[:id]).name
  end

  private
  def category_params
    params.require(:category).permit(:name.downcase, :spreadsheet_id)
  end
end
