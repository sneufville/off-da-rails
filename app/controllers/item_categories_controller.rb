class ItemCategoriesController < ApplicationController
  def index
    item_categories = ItemCategory.all
    render inertia: 'ItemCategories/ItemCategoryListing', props: {
      categories: item_categories
    }
  end

  def show
    begin
      item_category = ItemCategory.find(params[:id])
      item_count_for_category = item_category.items.count
      related_items = item_category.items.order(created_at: :desc).limit(3)
    rescue ActiveRecord::RecordNotFound
      error = "Item category not found"
    end


    render inertia: 'ItemCategories/ItemCategoryDetail', props: {
      error: error,
      category: item_category,
      item_count: item_count_for_category,
      related_items: related_items,
    }
  end
end
