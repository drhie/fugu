class CategoriesController < ApplicationController
  def index
    @index = {}
    spreadsheet_user.categories.map { |e| @index[e.id] = e.name }
    render json: @index
  end

  def create
    #Prevent a user from having duplicate categories
    if spreadsheet_user.categories.where(name: category_params[:name]).length > 0
      @category = Category.find_by(name: category_params[:name])
    else
      @category = Category.new(category_params)
      @category.user_id = spreadsheet_user.id if spreadsheet_user
      @category.save
    end

    #Prevent a spreadsheet from having duplicate categories
    @spreadsheet = Spreadsheet.find(params[:spreadsheet_id])
    if @spreadsheet.categories.exclude?(@category)
      @spreadsheet.categories << @category
    end
  end

  def show
    @category = Category.find(params[:id]).name
  end

  private
  def category_params
    params.require(:category).permit(:name.downcase)
  end
end
