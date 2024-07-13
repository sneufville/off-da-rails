/**
 * @author  sai
 * created  2024-07-12
 * project  off_da_rails_coffee
 */

import React from 'react';
import PageWrapper from '../../components/shared/PageWrapper/PageWrapper';
import type { ItemCategory } from '../../@types/offDaRails';
import InfoCard from '../../components/shared/InfoCard/InfoCard';
import ItemCategoryCard from '../../components/shared/ItemCategoryCard/ItemCategoryCard';

type CategoryListingProps = {
  categories: Array<ItemCategory>;
  categoryCounts: Record<string, number>;
};

const ItemCategoryListing: React.FC<CategoryListingProps> = ({
  categories,
  categoryCounts,
}) => {
  console.log('loaded item categories: ', categories);
  return (
    <PageWrapper>
      <h1>Item Categories</h1>
      {categories.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {categories.map((category) => (
            <ItemCategoryCard category={category} itemCount={0} />
          ))}
        </div>
      ) : (
        <InfoCard cardType={'info'} title={'No Item Categories were found'} />
      )}
    </PageWrapper>
  );
};

export default ItemCategoryListing;
