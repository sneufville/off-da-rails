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
import AppButton from '../AppButton/AppButton';

type ItemCardProps = {
  item: Item;
  itemCategory?: ItemCategory;
  itemImagePath?: string;
  linkBase?: string;
  addItemAction?: (item: Item) => void;
};

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  itemCategory,
  itemImagePath,
  linkBase,
  addItemAction,
}) => {
  return (
    <div className="p-2 bg-gray-50 rounded w-full">
      <div className="flex flex-col gap-y-2 flex-1 justify-between h-full">
        {itemImagePath ? (
          <img
            alt={`image for ${item.item_name}`}
            className="object-cover h-20 w-full"
            src={itemImagePath}
          />
        ) : null}
        <h2 className="text-xl font-bold hover:underline duration-200">
          <Link href={`/${linkBase ? linkBase : 'items'}/${item.id}`}>
            {item.item_name}
          </Link>
        </h2>
        <p className="text-lg">{item.item_description}</p>
        <p className="font-bold">${item.item_cost}</p>
        <div className="flex flex-col gap-2">
          {itemCategory ? (
            <Tag tagText={itemCategory.category_name} />
          ) : undefined}
          <AppButton
            onClick={() =>
              typeof addItemAction === 'function' ? addItemAction(item) : {}
            }
          >
            Add to Bag
            <BsFillCartPlusFill />
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
