/**
 * @author  sai
 * created  2024-08-10
 * project  off_da_rails_coffee
 */
import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  BiSolidArrowToRight,
  BiSolidCoffeeBean,
  BiSolidCuboid,
  BiSolidTag,
} from 'react-icons/bi';

const SubMenuButton = (): React.ReactNode => {
  return (
    <div className="p-2 sm:hidden">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md">
          <BiSolidCuboid size={32} />
        </MenuButton>
        <MenuItems
          transition
          anchor={'bottom end'}
          className="w-60 origin-top-right flex flex-col gap-2 rounded bg-slate-200 p-2 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <Link
              className="p-2 bg-green-600 rounded text-white flex items-center justify-between"
              href="/items"
            >
              Items
              <BiSolidCoffeeBean />
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              className="p-2 bg-green-600 rounded text-white flex items-center justify-between"
              href="/item_categories"
            >
              Item Categories
              <BiSolidTag />
            </Link>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default SubMenuButton;
