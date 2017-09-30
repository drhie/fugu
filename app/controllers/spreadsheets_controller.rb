class SpreadsheetsController < ApplicationController
  before_action :load_spreadsheet, only: [:edit, :update, :destroy, :last_item]

  def index
  end

  def new
    @spreadsheet = Spreadsheet.new
    @categories = Category.where(user_id: current_user.id)
  end

  def create
    @spreadsheet = Spreadsheet.new(spreadsheet_params)
    binding.pry
    @spreadsheet.user_id = current_user.id if current_user
    if @spreadsheet.save
      @spreadsheet.categories << current_user.categories.find_by(name: "income")
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

  def last_item
    render json: @spreadsheet.items.last
  end

  def load_spreadsheet
    @spreadsheet = Spreadsheet.find(params[:id])
  end

  private
  def spreadsheet_params
    params.require(:spreadsheet).permit(:name, :currency)
  end

end
