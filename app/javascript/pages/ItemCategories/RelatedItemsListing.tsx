/**
 * @author  sai
 * created  2024-07-13
 * project  off_da_rails_coffee
 */

import React from 'react';
import type { Item, ItemCategory } from '../../@types/offDaRails';
import PageWrapper from '../../components/shared/PageWrapper/PageWrapper';
import InfoCard from '../../components/shared/InfoCard/InfoCard';
import ItemCard from '../../components/shared/ItemCard/ItemCard';

type RelatedItemsListingProps = {
  category?: ItemCategory;
  related_items: Array<Item>;
  error?: string;
};

const RelatedItemsListing: React.FC<RelatedItemsListingProps> = ({
  category,
  related_items,
  error,
}) => {
  const [filterText, setFilterText] = React.useState<string>('');
  const filteredItems =
    filterText === ''
      ? related_items
      : related_items.filter((item) =>
          item.item_name.toLowerCase().includes(filterText.toLowerCase())
        );
  return (
    <PageWrapper>
      {category ? (
        <div className="flex flex-col gap-y-4">
          <h1 className="text-4xl">{category.category_name}</h1>
          <p>Showing all items for this category</p>
          <hr />
          <div>
            <input
              type="text"
              name="filterText"
              placeholder="Filter items by name"
              id="filterText"
              onChange={(e) => setFilterText(e.target.value)}
              value={filterText}
            />
          </div>
          {filteredItems.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <ItemCard key={`item-${item.id}`} item={item} />
              ))}
            </div>
          ) : (
            <InfoCard
              cardType="info"
              title="No items have been found for this category"
            />
          )}
        </div>
      ) : (
        <InfoCard
          cardType="error"
          title="Category and related data not found"
        />
      )}
    </PageWrapper>
  );
};

export default RelatedItemsListing;
