/**
 * @author  sai
 * created  2024-07-15
 * project  off_da_rails_coffee
 */

import React from 'react';
import { Link, router } from '@inertiajs/react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from '@headlessui/react';
import { BiSolidUserAccount } from 'react-icons/bi';
import type { CustomerProfile, User } from '../../../@types/offDaRails';
import LogoutDialog from '../LogoutDialog/LogoutDialog';

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
          className="w-60 origin-top-right rounded bg-slate-200 p-2 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <div className="flex flex-col gap-y-1 p-2">
              <span className="text-xs font-bold text-white/6">
                Logged in as:
              </span>
              <span className="text-base">{user.email}</span>
            </div>
          </MenuItem>
          <MenuSeparator className="my-1 h-px bg-white/6" />
          <MenuItem>
            <Link
              href="/customer_profiles/me"
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
            >
              My Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              onClick={() => setLogoutDialogOpen(true)}
            >
              Logout?
            </button>
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
