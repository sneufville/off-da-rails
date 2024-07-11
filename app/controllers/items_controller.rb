class ItemsController < ApplicationController
  def index
    item_category_filter = params[:item_category] || nil
    item_name = params[:item_name] || nil

    item_categories = ItemCategory.all
    items = Item.includes(:item_category)

    render inertia: 'Item/Index', props: {
      item_categories: item_categories,
      items: items,
      selected_item_category: item_category_filter
    }
  end

  def show
    begin
      @item = Item.includes(:item_category).find(params[:id])
      @related_category = @item.item_category
      # fetch related products
      @related_items = Item.includes(:item_category).where.not(id: @item.id).where( item_category_id: @item.item_category_id).limit(5)
    rescue ActiveRecord::RecordNotFound
      @error = "Item not found"
    end

    render inertia: 'Item/Detail', props: {
      item: @item,
      item_category: @related_category,
      related_items: @related_items,
      error: @error,
    }
  end
end
