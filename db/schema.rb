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

ActiveRecord::Schema[7.1].define(version: 2024_07_09_033406) do
  create_table "customer_order_items", force: :cascade do |t|
    t.integer "item_id"
    t.integer "order_id"
    t.integer "item_cost"
    t.string "item_name"
    t.integer "item_qty"
    t.integer "tax_amt"
    t.integer "item_total_cost"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "customer_orders", force: :cascade do |t|
    t.integer "customer_id"
    t.integer "order_total"
    t.integer "order_item_count"
    t.string "transaction_id"
    t.integer "order_state"
    t.boolean "order_complete"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.integer "item_category_id"
    t.integer "item_cost"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "provinces", force: :cascade do |t|
    t.string "province"
    t.string "abbreviation"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "provincial_taxes", force: :cascade do |t|
    t.integer "province_id"
    t.string "tax_label"
    t.integer "tax_amt"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
