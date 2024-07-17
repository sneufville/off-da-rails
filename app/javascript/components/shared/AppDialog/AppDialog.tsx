/**
 * @author  sai
 * created  2024-07-17
 * project  off_da_rails_coffee
 */
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogPanel,
  DialogBackdrop,
  Description,
} from '@headlessui/react';
import type { AppDialogType } from '../../../@types/offDaRails';
import {
  BiSolidCheckSquare,
  BiSolidError,
  BiSolidErrorAlt,
  BiSolidErrorCircle,
  BiSolidInfoSquare,
} from 'react-icons/bi';

type AppDialogProps = {
  content?: string;
  dialogActions?: React.ReactNode;
  dialogDismiss: () => void;
  dialogOpen: boolean;
  dialogType: AppDialogType;
  title: string;
};

const DialogIcon: Record<AppDialogType, React.ReactElement> = {
  error: <BiSolidError className="text-red-600" size={32} />,
  info: <BiSolidInfoSquare className="text-slate-600" size={32} />,
  success: <BiSolidCheckSquare className="text-green-600" size={32} />,
  warning: <BiSolidErrorAlt className="text-orange-600" size={32} />,
};

const AppDialog: React.FC<AppDialogProps> = ({
  content,
  dialogActions,
  dialogDismiss,
  dialogOpen,
  dialogType,
  title,
}) => {
  return (
    <Dialog open={dialogOpen} onClose={dialogDismiss} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-md space-y-4 p-4 bg-white">
          {DialogIcon[dialogType]}
          <DialogTitle className="font-bold">{title}</DialogTitle>
          <Description>
            <span className="font-bold">{content}</span>.
          </Description>
          <div className="flex items-center gap-x-2">
            {dialogActions ? (
              dialogActions
            ) : (
              <button
                className="w-full p-2 roudned text-white bg-slate-700"
                onClick={dialogDismiss}
              >
                Dismiss
              </button>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AppDialog;
