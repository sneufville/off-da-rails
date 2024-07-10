class ItemsController < ApplicationController
  def index
  end

  def show
    begin
      @item = Item.includes(:item_category).find(params[:id])
      @related_category = @item.item_category
    rescue ActiveRecord::RecordNotFound
      @error = "Item not found"
    end

    render inertia: 'Item/Detail', props: {
      item: @item,
      item_category: @related_category,
      error: @error,
    }
  end
end
