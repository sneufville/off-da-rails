/**
 * @author  sai
 * created  2024-07-12
 * project  off_da_rails_coffee
 */
import React from 'react';
import { Link } from '@inertiajs/react';
import type { ItemCategory } from '../../../@types/offDaRails';
import Tag from '../Tag/Tag';
import { BiSolidShoppingBag } from 'react-icons/bi';

type ItemCategoryCardProps = {
  category: ItemCategory;
  itemCount: number;
  linkBase?: string;
};

const ItemCategoryCard: React.FC<ItemCategoryCardProps> = ({
  category,
  itemCount,
  linkBase,
}) => {
  return (
    <div className="p-2 rounded bg-gray-50 flex flex-col gap-y-2">
      <h2 className="font-medium text-xl hover:underline">
        <Link href={`/item_categories/${category.id}`}>
          {category.category_name}
        </Link>
      </h2>
      <p>{category.category_description}</p>
      <Tag
        iconElement={<BiSolidShoppingBag />}
        tagText={`Number of items: ${itemCount}`}
      />
    </div>
  );
};

export default ItemCategoryCard;
