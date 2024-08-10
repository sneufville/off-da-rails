class HomepageController < ApplicationController
  def index
    # retrieve the items
    @items = Item.eager_load(:item_category).limit(5)
    @item_categories = ItemCategory.all
    @items.each do |item|
      puts "category for item: #{item.item_category.category_name}"
    end
    render inertia: "Home/Home", props: {
      name:            "Off_Da_RailZ Coffee Co",
      items:           @items,
      item_categories: @item_categories
    }
  end
end
