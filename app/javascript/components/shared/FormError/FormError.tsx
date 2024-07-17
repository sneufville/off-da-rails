/**
 * @author  sai
 * created  2024-07-16
 * project  off_da_rails_coffee
 */

import React from 'react';
import { BsExclamationOctagonFill } from 'react-icons/bs';

type FormErrorProps = {
  fieldLabel: string;
  message: string;
};

const FormError: React.FC<FormErrorProps> = ({ fieldLabel, message }) => {
  return (
    <div className="bg-red-50 rounded border-red-600 border-2 flex items-center gap-x-2 p-2">
      <BsExclamationOctagonFill className="text-red-600" size={20} />
      <div className="flex items-center gap-1">
        <p className="text-red-500 font-semibold">
          {fieldLabel}:
          <span className="font-bold text-red-600 ml-1">{message}</span>
        </p>
      </div>
    </div>
  );
};

export default FormError;
