/**
 * @author  sai
 * created  2024-07-18
 * project  off_da_rails_coffee
 */
import React from 'react';
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import {
  BiArrowBack,
  BiQuestionMark,
  BiSolidCheckCircle,
} from 'react-icons/bi';

type QuestionDialogProps = {
  dialogCancelAction: () => void;
  dialogConfirmAction: () => void;
  dialogContent: string;
  dialogOpen: boolean;
  dialogTitle: string;
};

const QuestionDialog: React.FC<QuestionDialogProps> = ({
  dialogCancelAction,
  dialogConfirmAction,
  dialogContent,
  dialogOpen,
  dialogTitle,
}) => {
  return (
    <Dialog open={dialogOpen} onClose={() => {}} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-md space-y-4 p-4 bg-white">
          <BiQuestionMark />
          <DialogTitle className="font-bold">{dialogTitle}</DialogTitle>
          <Description>
            <span className="font-bold">{dialogContent}</span>.
          </Description>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-x-1 rounded bg-slate-700 text-white p-2 w-full justify-between"
              onClick={dialogCancelAction}
            >
              <BiArrowBack /> No
            </button>
            <button
              className="flex items-center gap-x-1 rounded bg-blue-600 text-white p-2 w-full justify-between"
              onClick={dialogConfirmAction}
            >
              Yes <BiSolidCheckCircle />
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default QuestionDialog;
