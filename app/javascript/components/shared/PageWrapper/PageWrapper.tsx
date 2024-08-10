/**
 * @author  sai
 * created  2024-07-12
 * project  off_da_rails_coffee
 */
import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserAccountButton from '../UserAccountButton/UserAccountButton';
import { Cart, CustomerOrderItem, User } from '../../../@types/offDaRails';
import CartButton from '../CartButton/CartButton';
import SubMenuButton from '../SubMenuButton/SubMenuButton';

type PageWrapperProps = {
  children: React.ReactNode;
};

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const { current_user, cart, cart_items } = usePage().props;
  const _user = current_user as User;
  const _cart = cart as Cart;
  const _cart_items = cart_items as CustomerOrderItem[];
  console.log('from page wrapper -> current_user: ', current_user);
  return (
    <div className="flex flex-col gap-2 pb-20 h-full">
      <div
        className="bg-gray-50 p-4 w-full flex items-center justify-between"
        id="appMenu"
      >
        <span className="font-bold text-xl">Off Da Rails</span>
        <div className="flex items-center gap-x-4 px-2">
          <SubMenuButton />
          <div className="hidden sm:flex md:items-center gap-4">
            <Link className="text-lg uppercase hover:underline" href="/items">
              Items
            </Link>
            <Link
              className="text-lg uppercase hover:underline"
              href="/item_categories"
            >
              Item Categories
            </Link>
          </div>
          {_user ? (
            <>
              <CartButton cart={_cart} cartItems={_cart_items} />
              <UserAccountButton user={_user} />
            </>
          ) : (
            <a
              className="uppercase text-lg hover:underline"
              href="/users/sign_in"
            >
              Sign In/Up
            </a>
          )}
        </div>
      </div>
      <div id="contentArea" className="">
        {children}
      </div>
      <ToastContainer />
    </div>
  );
};

export default PageWrapper;
