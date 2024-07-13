/**
 * @author  sai
 * created  2024-07-12
 * project  off_da_rails_coffee
 */
import React from 'react';
import { Link } from '@inertiajs/react';

type PageWrapperProps = {
  children: React.ReactNode;
};

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
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
