/**
 * @author  sai
 * created  2024-08-09
 * project  off_da_rails_coffee
 */
import React from 'react';
type StackedLabelProps = {
  label: string;
  value: string;
};

const StackedLabel: React.FC<StackedLabelProps> = ({ label, value }) => {
  return (
    <div className="w-fit p-2 flex flex-col">
      <span className="font-medium text-base">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
};

export default StackedLabel;
