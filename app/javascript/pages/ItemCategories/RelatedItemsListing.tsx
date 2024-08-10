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
import { router, usePage } from '@inertiajs/react';
import ApiUtils from '../../utils/apiUtils';
import { toast } from 'react-toastify';
import ProfileFormModal from '../../components/shared/ProfileFormModal/ProfileFormModal';
import { BiSolidTag } from 'react-icons/bi';

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
  const { csrf_token } = usePage().props;
  const [showProfileModal, setShowProfileModal] =
    React.useState<boolean>(false);
  const [filterText, setFilterText] = React.useState<string>('');
  const filteredItems =
    filterText === ''
      ? related_items
      : related_items.filter((item) =>
          item.item_name.toLowerCase().includes(filterText.toLowerCase())
        );

  const execAddItemToCart = React.useCallback(
    (item: Item, count?: number) => {
      const _addToCart = async () => {
        const token = document
          .querySelector('meta[name="csrf-token"]')!
          .getAttribute('content');
        if (!token) return;
        const response = await ApiUtils.addItemToCart({
          itemId: item.id,
          itemCount: count ? count : 1,
          _token: token,
        });
        console.log('response: ', response);
        if (response.success) {
          // partial reload
          router.reload({
            only: ['cart', 'cart_items'],
          });
          toast.success('Item added to your cart');
        } else {
          if (response.code === 'ERR_NO_PROFILE') {
            console.log('show no profile, quick modal');
            setShowProfileModal(true);
          }
        }
      };

      _addToCart().then();
    },
    [csrf_token]
  );

  return (
    <PageWrapper>
      {category ? (
        <div className="flex flex-col gap-y-4">
          <h1 className="text-4xl flex items-center gap-1">
            <BiSolidTag /> {category.category_name}
          </h1>
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
                <ItemCard
                  key={`item-${item.id}`}
                  item={item}
                  addItemAction={(orderItem) => execAddItemToCart(orderItem, 1)}
                  itemCategory={category}
                />
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
      <ProfileFormModal
        dialogCancelAction={() => setShowProfileModal(false)}
        dialogConfirmAction={() => setShowProfileModal(false)}
        dialogContent={
          'Please update your profile so that the appropriate tax information can be displayed'
        }
        dialogOpen={showProfileModal}
        dialogTitle={'Update Profile'}
      />
    </PageWrapper>
  );
};

export default RelatedItemsListing;
