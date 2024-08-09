/**
 * @author  sai
 * created  2024-07-10
 * project  off_da_rails_coffee
 */

export type CommonResourceProps = {
  id: number;
  created_at: string;
  updated_at: string;
};

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
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  street_address_1?: string;
  street_address_2?: string;
  city?: string;
  province_id?: number;
  country?: string;
  created_at: string;
  updated_at: string;
};

export type Province = {
  id: number;
  province: string;
  abbreviation: string;
};

export type ProvinceTaxEntry = {
  id: number;
  province_id: number;
  tax_label: string;
  tax_amt: number;
};

export type APIResponse = {
  success: boolean;
  message: string;
  code?: string;
  data?: Array<Object> | Object | undefined;
  errors?: Array<{
    message: string;
  }>;
};

export type AppDialogType = 'error' | 'info' | 'success' | 'warning';

export type Cart = {
  id: number;
  order_total: number;
  order_item_count: number;
};

export type CustomerOrderItem = CommonResourceProps & {
  item_id: number;
  customer_order_id: number;
  item_cost: number;
  item_name: string;
  item_qty: number;
  tax_amt: number;
  item_total_cost: number;
  gst_amt: number;
  hst_amt: number;
  pst_amt: number;
};

export type CommonDialogProps = {
  dialogCancelAction: () => void;
  dialogConfirmAction: () => void;
  dialogContent: string;
  dialogOpen: boolean;
  dialogTitle: string;
};

export type CustomerOrder = CommonResourceProps & {
  customer_order_address?: string;
  order_complete: boolean;
  order_state: 0 | 1;
  order_total: number;
  total_gst: number;
  total_hst: number;
  total_pst: number;
  transaction_id: string | null;
  user_id: number;
};
