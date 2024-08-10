class ItemCategoriesController < ApplicationController
  def index
    item_categories = ItemCategory.all
    category_counts = {}
    item_categories.each do |category|
      category_counts[category.id] = category.items.count if category.id
    end
    render inertia: "ItemCategories/ItemCategoryListing", props: {
      categories:      item_categories,
      category_counts:
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

    render inertia: "ItemCategories/ItemCategoryDetail", props: {
      error:,
      category:      item_category,
      item_count:    item_count_for_category,
      related_items:
    }
  end

  def items_for_category
    begin
      category_id = params[:id]
      category = ItemCategory.find(category_id)
      related_items = category.items.order(created_at: :desc)
    rescue ActiveRecord::RecordNotFound
      error = "Failed to retrieve category and related items"
      related_items = []
    end

    render inertia: "ItemCategories/RelatedItemsListing", props: {
      category:,
      related_items:,
      error:
    }
  end
end
