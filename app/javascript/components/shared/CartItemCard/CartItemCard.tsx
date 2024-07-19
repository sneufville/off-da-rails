/**
 * @author  sai
 * created  2024-07-18
 * project  off_da_rails_coffee
 */
import React from 'react';

import type {
  CustomerOrderItem,
  ItemCategory,
} from '../../../@types/offDaRails';
import { BiSolidTrash } from 'react-icons/bi';
import QuestionDialog from '../QuestionDialog/QuestionDialog';

type CartItemCardProps = {
  item: CustomerOrderItem;
  itemCategory?: ItemCategory;
  deleteItemAction?: (item: CustomerOrderItem) => void;
};

const CartItemCard: React.FC<CartItemCardProps> = ({
  deleteItemAction,
  item,
  itemCategory,
}) => {
  const [showDeletePrompt, setShowDeletePrompt] =
    React.useState<boolean>(false);

  return (
    <div className="p-2 rounded bg-slate-50 flex items-center gap-2">
      <span className="font-bold">{item.item_qty} x</span>
      <div className="flex flex-col flex-1">
        <h2 className="text-lg font-bold text-slate-700">{item.item_name}</h2>
        <p>
          Item Cost: ${(item.item_cost / 100).toFixed(2)} - {item.tax_amount}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="bg-red-600 hover:cursor-pointer flex items-center gap-x-2 text-white hover:bg-red-500 duration-200 p-2 rounded"
          onClick={() => setShowDeletePrompt(true)}
        >
          <BiSolidTrash className="text-white" size={24} />
          Remove
        </button>
      </div>
      <QuestionDialog
        dialogCancelAction={() => setShowDeletePrompt(false)}
        dialogConfirmAction={() => {
          if (typeof deleteItemAction === 'function') {
            deleteItemAction(item);
            setShowDeletePrompt(false);
          }
        }}
        dialogContent={`You are about to delete ${item.item_name} from your cart, would you like to continue?`}
        dialogOpen={showDeletePrompt}
        dialogTitle={`Delete ${item.item_name}?`}
      />
    </div>
  );
};

export default CartItemCard;
