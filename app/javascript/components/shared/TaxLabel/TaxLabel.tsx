/**
 * @author  sai
 * created  2024-08-06
 * project  off_da_rails_coffee
 */

import React from 'react';
type TaxLabelProps = {
  taxLabel: string;
  taxAmount: number;
};

const TaxLabel: React.FC<TaxLabelProps> = ({ taxLabel, taxAmount }) => {
  return (
    <div className="p-2 rounded bg-slate-100 w-fit flex items-center gap-1">
      <span className="p-1 font-bold bg-slate-700 text-white rounded">
        {taxLabel}
      </span>
      <span>${taxAmount}</span>
    </div>
  );
};

export default TaxLabel;
