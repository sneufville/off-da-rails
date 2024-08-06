/**
 * @author  sai
 * created  2024-08-01
 * project  off_da_rails_coffee
 */
import React from 'react';
import type { ButtonHTMLAttributes } from 'react';

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconelement?: React.ReactNode;
};

const AppButton: React.FC<AppButtonProps> = (props) => {
  return (
    <button
      className="bg-green-600 hover:bg-green-500 duration-200 text-white font-bold flex items-center gap-1 rounded p-2 w-full justify-between"
      {...props}
    >
      {props.children}
      {props.iconelement}
    </button>
  );
};

export default AppButton;
