/**
 * @author  sai
 * created  2024-07-15
 * project  off_da_rails_coffee
 */

import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  BiSolidLogOut,
  BiSolidShoppingBag,
  BiSolidUserAccount,
} from 'react-icons/bi';
import type { CustomerProfile, User } from '../../../@types/offDaRails';
import LogoutDialog from '../LogoutDialog/LogoutDialog';
import AppButton from '../AppButton/AppButton';

type UserAccountButtonProps = {
  user: User;
  customer_profile?: CustomerProfile;
};

const UserAccountButton: React.FC<UserAccountButtonProps> = ({ user }) => {
  const [logoutDialogOpen, setLogoutDialogOpen] =
    React.useState<boolean>(false);

  const logoutAction = React.useCallback(() => {
    router.delete('/users/sign_out');
  }, []);

  return (
    <div className="p-2">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md">
          <BiSolidUserAccount size={32} />
        </MenuButton>
        <MenuItems
          transition
          anchor={'bottom end'}
          className="w-60 flex flex-col gap-2 origin-top-right rounded bg-slate-200 p-2 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <div className="flex flex-col gap-y-1 p-2 bg-slate-50 rounded">
              <span className="text-xs font-bold text-white/6">
                Logged in as:
              </span>
              <span className="text-base">{user.email}</span>
            </div>
          </MenuItem>
          <MenuItem>
            <Link
              href="/customer_profiles/me"
              className="duration-200 text-white font-bold flex items-center gap-1 rounded p-2 w-full justify-between bg-green-600"
            >
              My Profile
              <BiSolidUserAccount />
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/customer_orders/orders"
              className="duration-200 text-white font-bold flex items-center gap-1 rounded p-2 w-full justify-between bg-green-600"
            >
              My Orders
              <BiSolidShoppingBag />
            </Link>
          </MenuItem>
          <MenuItem>
            <AppButton
              extraclasses="bg-red-700 hover:bg-red-600"
              onClick={() => setLogoutDialogOpen(true)}
            >
              Logout?
              <BiSolidLogOut />
            </AppButton>
          </MenuItem>
        </MenuItems>
      </Menu>
      <LogoutDialog
        open={logoutDialogOpen}
        cancelAction={() => setLogoutDialogOpen(false)}
        logoutAction={logoutAction}
      />
    </div>
  );
};

export default UserAccountButton;
