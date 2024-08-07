/**
 * @author  sai
 * created  2024-08-06
 * project  off_da_rails_coffee
 */
import React from 'react';
import { BiSolidShoppingBag } from 'react-icons/bi';
import type { Cart } from '../../../@types/offDaRails';
import TaxLabel from '../TaxLabel/TaxLabel';

type CartSummaryCardProps = {
  cart: Cart;
};

const CustomerSummaryCard: React.FC<CartSummaryCardProps> = ({ cart }) => {
  return (
    <div className="p-2 rounded bg-slate-50 flex gap-2">
      <BiSolidShoppingBag size={32} />
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-medium">Cart Summary</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <TaxLabel taxLabel={'Order Total'} taxAmount={cart.order_total} />
          <div className="p-1 rounded flex items-center gap-2">
            <span className="bg-slate-700 text-white font-bold rounded p-1">
              Number of Items
            </span>
            <span>{cart.order_item_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerSummaryCard;
