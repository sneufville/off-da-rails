/**
 * @author  sai
 * created  2024-07-22
 * project  off_da_rails_coffee
 */

import React from 'react';
import type { Cart, ProvinceTaxEntry } from '../../../@types/offDaRails';
import { BiCreditCard } from 'react-icons/bi';

type OrderTotalCardProps = {
  cart: Cart;
  checkoutAction?: () => void;
  reqInProgress?: boolean;
  provinceTaxEntries: Array<ProvinceTaxEntry>;
};

const OrderTotalCard: React.FC<OrderTotalCardProps> = ({
  cart,
  checkoutAction,
  reqInProgress,
}) => {
  return (
    <div className="p-2 roudned flex flex-col w-full gap-2 bg-green-50">
      <h2 className="text-xl font-bold text-green-800">Cart Total</h2>
      <div className="flex flex-col gap-1 text-green-600">
        <span>
          Number of items:{' '}
          <span className="text-green-800 font-bold">
            {cart.order_item_count}
          </span>
        </span>
        <span>
          Order Total:{' '}
          <span className="text-green-800 font-bold">
            ${Number(cart.order_total).toFixed(2)}
          </span>
        </span>
      </div>
      <div className="flex flex-1">
        <button
          className="bg-green-600 hover:bg-green-500 duration-200 text-white font-bold flex items-center gap-1 rounded p-2 w-full justify-center"
          disabled={reqInProgress}
          onClick={checkoutAction}
        >
          <span className="flex items-center">
            <BiCreditCard size={32} />
            Checkout with Stripe ${Number(cart.order_total).toFixed(2)}
          </span>
        </button>
      </div>
    </div>
  );
};

export default OrderTotalCard;
