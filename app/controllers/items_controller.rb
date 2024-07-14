class ItemsController < ApplicationController
  def index
    item_category_filter = params[:item_category] || nil
    item_name = params[:item_name] || nil

    if item_name == ''
      item_name = nil
    end

    if item_category_filter == ''
      item_category_filter = nil
    end
    filter_condition = []
    if item_name
      filter_condition = ["item_name LIKE ?", "%#{item_name}%"]
    elsif item_category_filter
      filter_condition = ["item_category_id = ?", item_category_filter]
    elsif item_name && item_category_filter
      filter_condition = ["item_name LIKE ? AND item_category_id = ?", "%#{item_name}%", item_category_filter]
    end

    item_categories = ItemCategory.all
    items = Item.includes(:item_category).where(filter_condition).page params[:page]
    item_count = Item.where(filter_condition).count

    render inertia: 'Item/Index', props: {
      item_categories: item_categories,
      items: items,
      item_count: item_count ? item_count : 0,
      selected_item_category: item_category_filter,
      item_name_filter: item_name,
      # kaminari pagination
      current_page: params[:page]
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
