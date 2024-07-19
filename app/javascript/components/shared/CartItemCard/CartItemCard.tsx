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
import {
  BsCheckCircleFill,
  BsDashLg,
  BsDashSquareFill,
  BsPlusLg,
  BsPlusSquareFill,
} from 'react-icons/bs';

type CartItemCardProps = {
  item: CustomerOrderItem;
  itemCategory?: ItemCategory;
  deleteItemAction?: (item: CustomerOrderItem) => void;
  setQuantityAction?: (quantity: number) => void;
};

const CartItemCard: React.FC<CartItemCardProps> = ({
  setQuantityAction,
  deleteItemAction,
  item,
  itemCategory,
}) => {
  const [showDeletePrompt, setShowDeletePrompt] =
    React.useState<boolean>(false);
  const [itemQuantity, setItemQuantity] = React.useState<number>(1);

  React.useEffect(() => {
    setItemQuantity(item.item_qty);
  }, [item.item_qty]);

  // React.useEffect(() => {}, [itemQuantity])

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
        <div className="flex items-center gap-2">
          <button className="p-2 rounded text-white bg-slate-700">
            <BsPlusLg size={24} />
          </button>
          <span>
            Quantity: <span className="font-bold">{itemQuantity}</span>
          </span>
          <button className="p-2 rounded text-white bg-slate-700">
            <BsDashLg size={24} />
          </button>
          <button className="bg-green-600 rounded text-white p-2">
            <BsCheckCircleFill size={24} />
          </button>
        </div>
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
