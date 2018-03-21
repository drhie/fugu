class SpreadsheetsController < ApplicationController
  before_action :load_spreadsheet, only: [:edit, :update, :destroy, :delete_category, :last_item]

  def index
  end

  def new
    @spreadsheet = Spreadsheet.new
    @categories = Category.where(user_id: current_user.id)
  end

  def create
    @spreadsheet = Spreadsheet.new(spreadsheet_params)
    @spreadsheet.user_id = current_user.id if current_user
    if @spreadsheet.save
      @spreadsheet.categories << current_user.categories.find_by(name: "income")
      @spreadsheet.load_default_categories(params[:load_default_categories]) if params[:load_default_categories]
      redirect_to spreadsheet_path(@spreadsheet)
    else
      flash.now[:error] = "Missing name and/or currency"
      render :new
    end
  end

  def show
    @spreadsheet = Spreadsheet.find(params[:id])
    @spreadsheets = Spreadsheet.where(user_id: current_user.id).order(created_at: :asc)
  end

  def preview
    @spreadsheet = Spreadsheet.find(0)
    @spreadsheet.categories.destroy_all
    @spreadsheet.items.destroy_all
    @spreadsheet.categories.create(user_id: @spreadsheet.user_id, name: "income")
  end

  def edit
  end

  def update
    if @spreadsheet.update_attributes(spreadsheet_params)
      redirect_to root_url
    else
      render :edit
    end
  end

  def destroy
    @spreadsheet.delete
    redirect_to root_url
  end

  def delete_category
    category = @spreadsheet.categories.find_by(name: params[:name])
    @item_ids = @spreadsheet.items.where(category: category).pluck(:id)
    @spreadsheet.items.where(id: @item_ids).destroy_all
    category.items.any? ? @spreadsheet.categories.delete(category) : category.destroy
    render json: {deleted_ids: @item_ids, deleted_category: params[:name]}
  end

  def last_item
    render json: @spreadsheet.items.last
  end

  def load_spreadsheet
    @spreadsheet = Spreadsheet.find(params[:id] || 0)
  end

  private
  def spreadsheet_params
    params.require(:spreadsheet).permit(:name, :currency)
  end

end
