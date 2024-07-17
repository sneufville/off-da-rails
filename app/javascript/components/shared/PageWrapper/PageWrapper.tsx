/**
 * @author  sai
 * created  2024-07-12
 * project  off_da_rails_coffee
 */
import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { BiSolidShoppingBag } from 'react-icons/bi';
import UserAccountButton from '../UserAccountButton/UserAccountButton';
import { User } from '../../../@types/offDaRails';

type PageWrapperProps = {
  children: React.ReactNode;
};

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const { current_user } = usePage().props;
  const _user = current_user as User;
  console.log('from page wrapper -> current_user: ', current_user);
  return (
    <div className="flex flex-col">
      <div
        className="bg-gray-50 p-4 w-full flex items-center justify-between"
        id="appMenu"
      >
        <span className="font-bold text-xl">Menu Placeholder</span>
        <div className="flex items-center gap-x-2 px-2">
          <Link href="/items">Items</Link>
          <Link href="/item_categories">Item Categories</Link>
          <BiSolidShoppingBag size={32} />
          {_user ? (
            <UserAccountButton user={_user} />
          ) : (
            <a href="/users/sign_in">Sign Up</a>
          )}
        </div>
      </div>
      <div id="contentArea" className="">
        {children}
      </div>
      <div className="bg-gray-50 p-4 w-full" id="appFooter">
        <span>Footer Placeholder</span>
      </div>
    </div>
  );
};

export default PageWrapper;
