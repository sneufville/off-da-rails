class ItemsController < ApplicationController
  def index
    item_category_filter = params[:item_category] || nil
    item_name = params[:item_name] || nil
    item_available = params[:item_available] || nil
    show_recent = params[:show_recent] || nil

    if item_name == ''
      item_name = nil
    end

    if item_category_filter == ''
      item_category_filter = nil
    end

    # if item_available == ''
    #   item_available = nil
    # end

    filter_condition = []
    extra_conditions = []

    if item_name
      filter_condition = ["item_name LIKE ?", "%#{item_name}%"]
    elsif item_category_filter
      filter_condition = ["item_category_id = ?", item_category_filter]
    elsif item_name && item_category_filter
      filter_condition = ["item_name LIKE ? AND item_category_id = ?", "%#{item_name}%", item_category_filter]
    end

    # if item_available.in? [true, false]
    #   extra_conditions = ["is_available = ?", item_available]
    # end

    item_categories = ItemCategory.all
    # if extra_conditions.length
    #   items = Item.includes(:item_category).where(filter_condition).where(extra_conditions).page params[:page]
    # else
    items = Item.includes(:item_category).where(filter_condition).page params[:page]
    # end
    item_count = Item.where(filter_condition).count
    # item images
    related_images = {}

    item_images = ActiveStorage::Attachment
                    .joins(:blob)
                    .where(record_type: 'Item', name: 'item_image')
                    .select("active_storage_attachments.*, active_storage_blobs.filename, active_storage_blobs.byte_size, active_storage_blobs.content_type")

    item_images.each do |img|
      related_images[img['record_id']] = {
        filename: url_for(img)
      }
    end
    render inertia: 'Item/Index', props: {
      item_categories: item_categories,
      items: items,
      item_count: item_count ? item_count : 0,
      item_images: related_images,
      selected_item_category: item_category_filter,
      item_name_filter: item_name,
      # kaminari pagination
      current_page: params[:page]
    }
  end

  def show
    begin
      item = Item.includes(:item_category).find(params[:id])
      related_category = item.item_category
      # fetch related products
      related_items = Item.includes(:item_category).where.not(id: item.id).where( item_category_id: item.item_category_id).limit(5)
    rescue ActiveRecord::RecordNotFound
      error = "Item not found"
    end

    # related item image
    item_image = ActiveStorage::Attachment
                    .joins(:blob)
                    .where(record_type: 'Item', name: 'item_image', record_id: item.id)
                    .select("active_storage_attachments.*, active_storage_blobs.filename, active_storage_blobs.byte_size, active_storage_blobs.content_type").first

    item_image_path = {}
    if item_image
      item_image_path = {filename: url_for(item_image)}
    end

    render inertia: 'Item/Detail', props: {
      item: item,
      item_category: related_category,
      item_image: item_image_path,
      related_items: related_items,
      error: error,
    }
  end
end
