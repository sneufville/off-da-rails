# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_08_10_053117) do
  create_table "about_pages", force: :cascade do |t|
    t.string "page_title"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["page_title"], name: "index_about_pages_on_page_title", unique: true
  end

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.integer "resource_id"
    t.string "author_type"
    t.integer "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource"
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "contact_pages", force: :cascade do |t|
    t.string "contact_email_address"
    t.string "contact_phone_number"
    t.text "content"
    t.string "page_title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["page_title"], name: "index_contact_pages_on_page_title", unique: true
  end

  create_table "customer_order_items", force: :cascade do |t|
    t.integer "item_id", null: false
    t.integer "customer_order_id", null: false
    t.decimal "item_cost"
    t.string "item_name"
    t.integer "item_qty"
    t.decimal "item_total_cost"
    t.decimal "hst_amt", default: "0.0"
    t.decimal "gst_amt", default: "0.0"
    t.decimal "pst_amt", default: "0.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_order_id"], name: "index_customer_order_items_on_customer_order_id"
    t.index ["item_id"], name: "index_customer_order_items_on_item_id"
  end

  create_table "customer_orders", force: :cascade do |t|
    t.integer "user_id", null: false
    t.decimal "order_total", default: "0.0"
    t.integer "order_item_count", default: 0
    t.string "transaction_id"
    t.integer "order_state"
    t.boolean "order_complete"
    t.decimal "total_gst", default: "0.0"
    t.decimal "total_pst", default: "0.0"
    t.decimal "total_hst", default: "0.0"
    t.string "customer_order_address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_customer_orders_on_user_id"
  end

  create_table "customer_profiles", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "phone_number"
    t.string "street_address_1"
    t.string "street_address_2"
    t.string "city"
    t.integer "province_id"
    t.string "country"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_customer_profiles_on_user_id"
  end

  create_table "item_categories", force: :cascade do |t|
    t.string "category_name"
    t.string "category_description"
    t.string "category_image_path"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "items", force: :cascade do |t|
    t.string "item_name"
    t.string "item_description"
    t.integer "item_category_id", null: false
    t.decimal "item_cost"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_available", default: true
    t.index ["item_category_id"], name: "index_items_on_item_category_id"
  end

  create_table "provinces", force: :cascade do |t|
    t.string "province"
    t.string "abbreviation"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "provincial_taxes", force: :cascade do |t|
    t.string "tax_label"
    t.decimal "tax_amt"
    t.integer "province_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["province_id"], name: "index_provincial_taxes_on_province_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "user_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "customer_order_items", "customer_orders"
  add_foreign_key "customer_order_items", "items"
  add_foreign_key "customer_orders", "users"
  add_foreign_key "customer_profiles", "users"
  add_foreign_key "items", "item_categories"
  add_foreign_key "provincial_taxes", "provinces"
end
