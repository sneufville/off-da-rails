/**
 * @author  sai
 * created  2024-07-18
 * project  off_da_rails_coffee
 */
import React from 'react';

import type {
  CustomerOrderItem,
  ItemCategory,
} from '../../../@types/offDaRails';
import { BiSolidTrash } from 'react-icons/bi';

type CartItemCardProps = {
  item: CustomerOrderItem;
  itemCategory?: ItemCategory;
  deleteAction?: (item: CustomerOrderItem) => void;
};

const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  return (
    <div className="p-2 rounded bg-slate-50 flex items-center gap-2">
      <span className="font-bold">{item.item_qty} x</span>
      <div className="flex flex-col flex-1">
        <h2 className="text-lg font-bold text-slate-700">{item.item_name}</h2>
        <p>
          Item Cost: ${(item.item_cost / 100).toFixed(2)} - {item.tax_amount}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <BiSolidTrash className="text-red-600 hover:cursor-pointer" size={24} />
      </div>
    </div>
  );
};

export default CartItemCard;
