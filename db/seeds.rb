# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

PROVINCE_DATA = {
  'ab' => {
    :province => 'Alberta',
    :abbreviation => 'AB'
  },
  'bc' => {
    :province => 'British Columbia',
    :abbreviation => 'BC',
  },
  'mb' => {
    :province => 'Manitoba',
    :abbreviation => 'MB'
  },
  'nl' => {
    :province => 'Newfoundland and Labrador',
    :abbreviation => 'NL'
  },
  'ns' => {
    :province => 'Nova Scotia',
    :abbreviation => 'NS'
  },
  'nt' => {
    :province => 'Northwest Territories',
    :abbreviation => 'NT'
  },
  'nu' => {
    :province => 'Nunavut',
    :abbreviation => 'NU'
  },
  'on' => {
    :province => 'Ontario',
    :abbreviation => 'ON'
  },
  'pe' => {
    :province => 'Prince Edward Island',
    :abbreviation => 'PE'
  },
  'qc' => {
    :province => 'Quebec',
    :abbreviation => 'QC'
  },
  'sk' => {
    :province => 'Saskatchewan',
    :abbreviation => 'SK',
  },
  'yt' => {
    :province => 'Yukon',
    :abbreviation => 'YT'
  }
}

tax_rates_url = 'https://api.salestaxapi.ca/v2/province/all'

# clear data
CustomerOrderItem.destroy_all
CustomerOrder.destroy_all
Item.destroy_all
ItemCategory.destroy_all
Province.destroy_all
ProvincialTax.destroy_all

# Create Provinces
PROVINCE_DATA.each do |key, province_obj|
  # create province data
  Province.create!(
    province: province_obj[:province],
    abbreviation: province_obj[:abbreviation]
  )
end
