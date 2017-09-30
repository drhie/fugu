class SpreadsheetsController < ApplicationController
  before_action :load_spreadsheet, only: [:edit, :update, :destroy, :last_item]

  def index
  end

  def new
    @spreadsheet = Spreadsheet.new
  end

  def create
    @spreadsheet = Spreadsheet.new(spreadsheet_params)
    @spreadsheet.user_id = current_user.id if current_user
    if @spreadsheet.save
      @category = Category.new(name: "income", spreadsheet_id: @spreadsheet.id)
      @category.user_id = current_user.id if current_user
      @category.save
      redirect_to spreadsheet_path(@spreadsheet)
    end
  end

  def show
    @spreadsheet = Spreadsheet.find(params[:id])
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
