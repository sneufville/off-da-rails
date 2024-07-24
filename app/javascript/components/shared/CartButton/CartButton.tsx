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
import { BiSolidArrowToRight } from 'react-icons/bi';

type CartButtonProps = {
  cart: Cart | null;
  cartItems: CustomerOrderItem[];
};

const CartButton: React.FC<CartButtonProps> = ({ cartItems }) => {
  return (
    <div className="p-2">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md">
          <div className="relative">
            <span className="rounded-xl py-0.5 px-1 bg-blue-600 text-white absolute -top-2 -right-2">
              {cartItems.length}
            </span>
            <BsFillCartPlusFill size={32} />
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
                <span className="text-base font-medium">
                  {cartItems.length}
                </span>
              </div>
            </div>
          </MenuItem>
          <MenuSeparator className="my-1 h-px bg-white/6" />
          <MenuItem>
            <Link
              className="p-2 bg-indigo-600 rounded text-white flex items-center"
              href="/customer_orders/checkout"
            >
              Checkout
              <BiSolidArrowToRight />
            </Link>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default CartButton;
