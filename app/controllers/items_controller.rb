class ItemsController < ApplicationController

  def new
    @item = Item.new
  end

  def create
    @item = Item.new(item_params)
    @item.user_id = current_user.id if current_user
    @item.spreadsheet_id = params[:spreadsheet_id]
    @item.category_id = Spreadsheet.find(@item.spreadsheet_id).set_category(params[:category])
    @item.save
  end

  def edit
    @item = Item.find(params[:id])
  end

  def update
    @item = Item.find(params[:id])
    @item.category_id = Spreadsheet.find(@item.spreadsheet_id).set_category(params[:category])
    @item.update_attributes(item_params)
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy
  end

  private
  def item_params
    params.require(:item).permit(:name, :amount, :is_expense, :transaction_date, :comment, :spreadsheet_id)
  end
end
