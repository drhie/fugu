class SpreadsheetsController < ApplicationController
  before_action :load_spreadsheet, only: [:edit, :update, :destroy]

  def index
  end

  def new
    @spreadsheet = Spreadsheet.new
  end

  def create
    @spreadsheet = Spreadsheet.new(spreadsheet_params)
    if @spreadsheet.save
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

  def load_spreadsheet
    @spreadsheet = Spreadsheet.find(params[:id])
  end

  private
  def spreadsheet_params
    params.require(:spreadsheet).permit(:name, :currency)
  end

end
