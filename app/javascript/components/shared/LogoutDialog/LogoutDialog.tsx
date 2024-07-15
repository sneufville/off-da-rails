/**
 * @author  sai
 * created  2024-07-15
 * project  off_da_rails_coffee
 */

import React from 'react';
import {
  Button,
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { BiArrowBack, BiLogOut } from 'react-icons/bi';

type LogoutDialogProps = {
  logoutUrl?: string;
  open: boolean;
  cancelAction: () => void;
  logoutAction: () => void;
};

const LogoutDialog: React.FC<LogoutDialogProps> = ({
  logoutUrl,
  open,
  cancelAction,
  logoutAction,
}) => {
  return (
    <Dialog open={open} onClose={() => {}} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-md space-y-4 p-4 bg-white">
          <BiLogOut />
          <DialogTitle className="font-bold">Logout?</DialogTitle>
          <Description>
            You are about to logout from{' '}
            <span className="font-bold">Off Da Rails Coffee</span>.
          </Description>
          <p>Would you like to continue?</p>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-x-1 rounded bg-slate-700 text-white p-2 w-full justify-between"
              onClick={cancelAction}
            >
              <BiArrowBack /> No, Stay Logged In
            </button>
            <button
              className="flex items-center gap-x-1 rounded bg-red-600 text-white p-2 w-full justify-between"
              onClick={logoutAction}
            >
              Logout <BiLogOut />
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default LogoutDialog;
