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
};

export type ItemCategory = {
  id: number;
  category_name: string;
  category_description: string;
  category_image_path?: string;
};

export type InfoCardType = 'error' | 'info';
