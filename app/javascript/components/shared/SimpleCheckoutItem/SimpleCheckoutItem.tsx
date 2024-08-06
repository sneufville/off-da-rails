/**
 * @author  sai
 * created  2024-07-22
 * project  off_da_rails_coffee
 */

import React from 'react';
import type {
  CustomerOrderItem,
  ItemCategory,
} from '../../../@types/offDaRails';

type SimpleCheckoutItemProps = {
  item: CustomerOrderItem;
  itemCategory?: ItemCategory;
};

const SimpleCheckoutItem: React.FC<SimpleCheckoutItemProps> = ({
  item,
  itemCategory,
}) => {
  return (
    <div className="p-2 flex items-center gap-x-2 rounded bg-slate-50">
      <div className="flex flex-col flex-1">
        <h2 className="text-xl font-bold text-slate-800">
          {item.item_qty} x {item.item_name}
        </h2>
        <p>{itemCategory?.category_name}</p>
      </div>
      <div className="flex flex-col items-end text-right">
        <span className="text-right text-lg font-bold">
          Item Total Cost: ${item.item_total_cost.toFixed(2)}
        </span>
        <span className="text-slate-600">
          <span className="font-medium">Item Cost: ${item.item_cost}</span> +{' '}
          <span>Tax: ${item.tax_amt}</span>
        </span>
      </div>
    </div>
  );
};

export default SimpleCheckoutItem;
