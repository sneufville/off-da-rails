/**
 * @author  sai
 * created  2024-07-15
 * project  off_da_rails_coffee
 */
import { APIResponse, Province } from '../@types/offDaRails';

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
}
