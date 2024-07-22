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

type CartAPIRequestProps = {
  itemId: number;
  token: string;
};

type CartQuantityAPIRequestProps = CartAPIRequestProps & {
  itemCount: number;
};

export default class ApiUtils {
  static getCSRFToken(): string | null {
    return document
      .querySelector('meta[name="csrf-token"]')!
      .getAttribute('content');
  }

  static buildAPIRequestHeaders(token: string) {
    return {
      'content-type': 'application/json',
      'X-CSRF-TOKEN': token,
    };
  }

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

  static async editCartItem({
    itemCount,
    itemId,
    token,
  }: CartQuantityAPIRequestProps): Promise<APIResponse> {
    const headers = this.buildAPIRequestHeaders(token);
    try {
      const url = `/api/customer_orders/cart/${itemId}/qty`;
      const { data: responseData } = await axios.put(
        url,
        { customer_order_items: { item_id: itemId, item_qty: itemCount } },
        { headers }
      );
      return responseData as APIResponse;
    } catch (e) {
      return {
        success: false,
        message: (e as Error).message,
      };
    }
  }

  static async removeItemFromCart({
    itemId,
    token,
  }: CartAPIRequestProps): Promise<APIResponse> {
    const headers = this.buildAPIRequestHeaders(token);
    try {
      const url = `/api/customer_orders/cart/${itemId}`;
      const { data: responseData } = await axios.delete(url, { headers });
      return responseData as APIResponse;
    } catch (e) {
      return {
        success: false,
        message: (e as Error).message,
      };
    }
  }
}
