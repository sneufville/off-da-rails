/**
 * @author  sai
 * created  2024-07-11
 * project  off_da_rails_coffee
 */

import React from 'react';
import { Link } from '@inertiajs/react';
import type { Item, ItemCategory } from '../../../@types/offDaRails';
import Tag from '../Tag/Tag';

type ItemCardProps = {
  item: Item;
  itemCategory?: ItemCategory;
  linkBase?: string;
};

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  itemCategory,
  linkBase,
}) => {
  return (
    <div className="p-2 bg-gray-50 rounded w-full">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-xl font-bold hover:underline duration-200">
          <Link href={`${linkBase ? linkBase : 'items'}/${item.id}`}>
            {item.item_name}
          </Link>
        </h2>
        <p className="text-lg">{item.item_description}</p>
        <p className="font-bold">${(item.item_cost / 100).toFixed(2)}</p>
        {itemCategory ? (
          <Tag tagText={itemCategory.category_name} />
        ) : undefined}
      </div>
    </div>
  );
};

export default ItemCard;
