class ItemsController < ApplicationController

  def new
    @item = Item.new
  end

  def create
    @item = Item.new(item_params)
    @item.save
  end

  def edit
    @item = Item.find(params[:id])
  end

  def update
    @item = Item.find(params[:id])
    @item.update_attributes(item_params)
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy
  end

  private
  def item_params
    params.require(:item).permit(:name, :amount, :is_expense, :item_type, :spreadsheet_id)
  end
end
