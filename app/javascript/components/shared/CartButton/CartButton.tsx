/**
 * @author  sai
 * created  2024-07-18
 * project  off_da_rails_coffee
 */

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from '@headlessui/react';
import React from 'react';
import { BsFillCartPlusFill } from 'react-icons/bs';
import type { Cart, CustomerOrderItem } from '../../../@types/offDaRails';
import { Link } from '@inertiajs/react';
import { BiSolidArrowToRight, BiSolidShoppingBag } from 'react-icons/bi';

type CartButtonProps = {
  cart: Cart | null;
  cartItems: CustomerOrderItem[];
};

const CartButton: React.FC<CartButtonProps> = ({ cart, cartItems }) => {
  return (
    <div className="p-2">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md">
          <div className="relative">
            <span className="rounded-xl h-6 w-6 bg-blue-600 text-white absolute -top-2 -right-2">
              {cartItems.length}
            </span>
            <BiSolidShoppingBag size={32} />
          </div>
        </MenuButton>
        <MenuItems
          transition
          anchor={'bottom end'}
          className="w-60 origin-top-right rounded bg-slate-200 p-2 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <div>
              <div className="flex items-center justify-between gap-y-1 p-2">
                <span className="text-xs font-bold text-white/6">
                  Items in your cart:
                </span>
                <span className="text-base bg-slate-50 rounded text-slate-700 p-1 font-medium">
                  {cartItems.length}
                </span>
              </div>
            </div>
          </MenuItem>
          <MenuItem>
            <div className="flex items-center justify-between p-2">
              <span className="text-xs font-bold">Cart Total</span>
              <span className="text-base bg-slate-50 rounded text-slate-700 p-1 font-medium">
                ${cart ? Number(cart.order_total).toFixed(2) : 0.0}
              </span>
            </div>
          </MenuItem>
          <MenuSeparator className="my-1 h-px bg-white/6" />
          <MenuItem>
            <Link
              className="p-2 bg-green-600 rounded text-white flex items-center justify-between"
              href="/customer_orders/customer_cart"
            >
              Go to your cart
              <BiSolidArrowToRight />
            </Link>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default CartButton;
