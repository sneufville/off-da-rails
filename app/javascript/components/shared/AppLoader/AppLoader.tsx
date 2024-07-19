/**
 * @author  sai
 * created  2024-07-18
 * project  off_da_rails_coffee
 */
import React from 'react';
import Lottie from 'lottie-react';
import coffeeLoader from '../../animations/coffeeLoader.json';
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { BiQuestionMark } from 'react-icons/bi';

type AppLoaderProps = {
  loaderContent?: string;
  loaderTitle?: string;
  open: boolean;
};

const AppLoader: React.FC<AppLoaderProps> = ({
  loaderContent,
  loaderTitle,
  open,
}) => {
  return (
    <Dialog open={open} onClose={() => {}} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-md space-y-4 p-4 bg-white rounded">
          <DialogTitle className="font-bold">{loaderTitle}</DialogTitle>
          <Lottie animationData={coffeeLoader} />
          <Description>
            <span className="font-bold">{loaderContent}</span>
          </Description>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AppLoader;
