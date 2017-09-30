class CategoriesController < ApplicationController
  def create
    @category = Category.new(category_params)
    @category.user_id = current_user.id if current_user
    @category.save
  end

  private
  def category_params
    params.require(:category).permit(:name, :spreadsheet_id)
  end
end
