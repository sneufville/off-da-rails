/**
 * @author  sai
 * created  2024-07-15
 * project  off_da_rails_coffee
 */
import axios from 'axios';
import { APIResponse, Province } from '../@types/offDaRails';

type AddItemProps = {
  itemId: number;
  itemCount: number;
  _token: string;
};

export default class ApiUtils {
  static async fetchProvinces(): Promise<Province[]> {
    try {
      const url = '/api/provinces';
      const response = await fetch(url);
      return (await response.json())['provinces'] as Province[];
    } catch (e) {
      return [];
    }
  }

  static async addItemToCart({
    itemId,
    itemCount,
    _token,
  }: AddItemProps): Promise<APIResponse> {
    try {
      const url = `/api/customer_orders/cart/${itemId}`;
      const { data: responseData } = await axios.post(
        url,
        {
          item_qty: itemCount,
        },
        {
          headers: {
            'content-type': 'application/json',
            'X-CSRF-TOKEN': _token,
          },
        }
      );
      return responseData as APIResponse;
    } catch (e) {
      console.error(
        'Failed to add item to cart with error: ',
        (e as Error).message
      );
      return {
        success: false,
        message: (e as Error).message,
      };
    }
  }
}
