/**
 * @author  sai
 * created  2024-07-11
 * project  off_da_rails_coffee
 */

import React from 'react';
import { Link } from '@inertiajs/react';
import type { Item, ItemCategory } from '../../../@types/offDaRails';
import Tag from '../Tag/Tag';
import { BsFillCartPlusFill } from 'react-icons/bs';

type ItemCardProps = {
  item: Item;
  itemCategory?: ItemCategory;
  linkBase?: string;
  addItemAction?: (item: Item) => void;
};

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  itemCategory,
  linkBase,
  addItemAction,
}) => {
  return (
    <div className="p-2 bg-gray-50 rounded w-full">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-xl font-bold hover:underline duration-200">
          <Link href={`/${linkBase ? linkBase : 'items'}/${item.id}`}>
            {item.item_name}
          </Link>
        </h2>
        <p className="text-lg">{item.item_description}</p>
        <p className="font-bold">${item.item_cost}</p>
        {itemCategory ? (
          <Tag tagText={itemCategory.category_name} />
        ) : undefined}
        <div>
          <button
            className="p-2 rounded flex items-center gap-x-2 bg-indigo-600 text-white hover:bg-indigo-400"
            onClick={() =>
              typeof addItemAction === 'function' ? addItemAction(item) : {}
            }
          >
            <BsFillCartPlusFill />
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
