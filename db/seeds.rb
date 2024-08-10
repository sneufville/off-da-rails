require "net/http"
require "json"
require "faker"

# This file should ensure the existence of records required to run the application in every
# environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in
# every environment.
# The data can then be loaded with the bin/rails db:seed command
# (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

PROVINCE_DATA = {
  "ab" => {
    province:     "Alberta",
    abbreviation: "AB"
  },
  "bc" => {
    province:     "British Columbia",
    abbreviation: "BC"
  },
  "mb" => {
    province:     "Manitoba",
    abbreviation: "MB"
  },
  "nl" => {
    province:     "Newfoundland and Labrador",
    abbreviation: "NL"
  },
  "ns" => {
    province:     "Nova Scotia",
    abbreviation: "NS"
  },
  "nt" => {
    province:     "Northwest Territories",
    abbreviation: "NT"
  },
  "nu" => {
    province:     "Nunavut",
    abbreviation: "NU"
  },
  "on" => {
    province:     "Ontario",
    abbreviation: "ON"
  },
  "pe" => {
    province:     "Prince Edward Island",
    abbreviation: "PE"
  },
  "qc" => {
    province:     "Quebec",
    abbreviation: "QC"
  },
  "sk" => {
    province:     "Saskatchewan",
    abbreviation: "SK"
  },
  "yt" => {
    province:     "Yukon",
    abbreviation: "YT"
  }
}.freeze

tax_rates_url = URI("https://api.salestaxapi.ca/v2/province/all")
FAKE_COFFEE_API = URI("https://fake-coffee-api.vercel.app/api")

# clear data
CustomerOrderItem.destroy_all
CustomerOrder.destroy_all
Item.destroy_all
ItemCategory.destroy_all
Province.destroy_all
ProvincialTax.destroy_all

response = Net::HTTP.get(tax_rates_url)
tax_rate_data = JSON.parse(response)

coffee_response = Net::HTTP.get(FAKE_COFFEE_API)
fake_coffee_data = JSON.parse(coffee_response)

# Create Provinces and tax entries
PROVINCE_DATA.each do |key, province_obj|
  # create province data
  prov = Province.create!(
    province:     province_obj[:province],
    abbreviation: province_obj[:abbreviation]
  )

  tax_obj = tax_rate_data[key]
  next unless tax_obj

  if tax_obj["gst"] >= 0
    ProvincialTax.create!(province_id: prov.id, tax_label: "gst", tax_amt: tax_obj["gst"])
  end
  # check for hst
  if tax_obj["hst"] >= 0
    ProvincialTax.create!(province_id: prov.id, tax_label: "hst", tax_amt: tax_obj["hst"])
  end
  # check for pst
  next unless tax_obj["pst"] >= 0

  ProvincialTax.create!(province_id: prov.id, tax_label: "pst", tax_amt: tax_obj["pst"])
end

# seed with "scraped data"
fake_coffee_data.each do |coffee_obj|
  item = Item.new(
    item_name:        coffee_obj["name"],
    item_description: coffee_obj["description"],
    item_cost:        coffee_obj["price"]
  )

  related_category = ItemCategory.find_or_create_by(category_name: coffee_obj["flavor_profile"][0])
  related_category.category_description = Faker::Lorem.paragraph
  related_category.save
  item.item_category = related_category
  item.save!
  Rails.logger.debug "item created (api): #{item.item_name}"
end

# Create item categories with Faker
category_number = 1
5.times do
  category_name = "coffee-item-#{category_number}"
  item_category = ItemCategory.create!(
    category_name:,
    category_description: Faker::Lorem.paragraph
  )

  Rails.logger.debug "item category: #{category_name} created"

  21.times do
    # create
    item = Item.new(
      item_name:        Faker::Commerce.product_name,
      item_description: Faker::Lorem.paragraph,
      item_cost:        Faker::Commerce.price(range: 1..50)
    )
    item.item_category = item_category
    item.save!

    Rails.logger.debug "item created: #{item.item_name}"
  end

  category_number += 1
end
if Rails.env.development?
  AdminUser.create!(email: "admin@example.com", password: "password",
                    password_confirmation: "password")
end
