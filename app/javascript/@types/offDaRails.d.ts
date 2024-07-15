/**
 * @author  sai
 * created  2024-07-10
 * project  off_da_rails_coffee
 */

export type Item = {
  id: number;
  item_cost: number;
  item_name: string;
  item_description: string;
  is_available: boolean;
  updated_at: string;
  created_at: string;
};

export type ItemCategory = {
  id: number;
  category_name: string;
  category_description: string;
  category_image_path?: string;
};

export type InfoCardType = 'error' | 'info';

export type User = {
  id: number;
  email: string;
  user_type?: string;
  created_at: string;
  updated_at: string;
};

export type CustomerProfile = {
  id: number;
  customer_id: number;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  street_address_1?: string;
  street_address_2?: string;
  city?: string;
  province_id?: string;
  country?: string;
  created_at: string;
  updated_at: string;
};
