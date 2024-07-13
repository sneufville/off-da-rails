/**
 * @author  sai
 * created  2024-07-12
 * project  off_da_rails_coffee
 */

import React from 'react';
import type { Item, ItemCategory } from '../../@types/offDaRails';
import PageWrapper from '../../components/shared/PageWrapper/PageWrapper';
import InfoCard from '../../components/shared/InfoCard/InfoCard';
import Tag from '../../components/shared/Tag/Tag';
import { BiSolidShoppingBag } from 'react-icons/bi';
import ItemCard from '../../components/shared/ItemCard/ItemCard';

type ItemCategoryDetailProps = {
  category?: ItemCategory;
  error?: string;
  item_count?: number;
  related_items: Array<Item>;
};

const ItemCategoryDetail: React.FC<ItemCategoryDetailProps> = ({
  category,
  error,
  item_count,
  related_items,
}) => {
  return (
    <PageWrapper>
      {category ? (
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl">{category.category_name}</h1>
          <p>{category.category_description}</p>
          <Tag
            iconElement={<BiSolidShoppingBag />}
            tagText={`Number of related items: ${item_count}`}
          />
          <hr />
          <h2 className="text-2xl">
            Most Recently Added Items for this category
          </h2>
          <div>
            {related_items.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {related_items.map((item) => (
                  <ItemCard key={`related-item-${item.id}`} item={item} />
                ))}
              </div>
            ) : (
              <InfoCard
                cardType="info"
                title="No related items that have been recently added for this category"
              />
            )}
          </div>
        </div>
      ) : (
        <InfoCard cardType={'error'} title={'Item Category Not Found'} />
      )}
    </PageWrapper>
  );
};

export default ItemCategoryDetail;
