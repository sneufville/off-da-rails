/**
 * @author  sai
 * created  2024-07-15
 * project  off_da_rails_coffee
 */
import axios, { AxiosError } from 'axios';
import type {
  APIResponse,
  CustomerProfile,
  Province,
} from '../@types/offDaRails';

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
      const axiosError = e as AxiosError;
      const { response: errorResponse } = axiosError;
      return errorResponse
        ? (errorResponse.data as APIResponse)
        : {
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
        message: 'Failed to remove item from cart',
      };
    }
  }

  static async updateProfile(
    token: string,
    profileData: CustomerProfile
  ): Promise<APIResponse> {
    const headers = this.buildAPIRequestHeaders(token);

    try {
      const url = `/api/customer_profiles/me`;

      const payload: Record<string, any> = { ...profileData };
      delete payload['created_at'];
      delete payload['updated_at'];
      delete payload['user_id'];
      delete payload['id'];

      const { data: responseData } = await axios.put(
        url,
        {
          customer_profile: { ...payload },
        },
        { headers }
      );

      return responseData as APIResponse;
    } catch (e) {
      return {
        success: false,
        message: 'Failed to update profile',
      };
    }
  }
}
