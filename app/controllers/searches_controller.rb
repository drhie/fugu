class SearchesController < ApplicationController
  before_action :load_default_variables

  def index
  end

  def search
    search_fields = params[:search_field]
    @results = spreadsheet_user.spreadsheets.pluck(:id).map { |i| [i, {amount: 0, item_count: 0}] }.to_h
    if params[:commit] == "Word Trend"
      filtered_items = search_fields.map do |search_field|
        Item.where(user_id: spreadsheet_user.id).where(is_expense: true).where("lower(name) ILIKE ?", "%#{search_field.downcase}%") if search_field.strip.present?
      end.uniq.compact.flatten
    else
      search_categories = @categories.where(name: search_fields).pluck(:id)
      filtered_items = search_categories.map do |id|
        Item.where(user_id: spreadsheet_user.id).where(category_id: id)
      end.uniq.compact.flatten
    end
    filtered_items.each do |item|
      if @results[item.spreadsheet_id]
        @results[item.spreadsheet_id][:amount] += item.amount
        @results[item.spreadsheet_id][:item_count] += 1
      end
    end
    render :index
  end

  private
  def load_default_variables
    @categories = spreadsheet_user.categories
    @spreadsheets = spreadsheet_user.spreadsheets.order(:id)
  end
end
