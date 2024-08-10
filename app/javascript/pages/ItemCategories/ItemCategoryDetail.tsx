/**
 * @author  sai
 * created  2024-07-12
 * project  off_da_rails_coffee
 */

import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import type { Item, ItemCategory } from '../../@types/offDaRails';
import PageWrapper from '../../components/shared/PageWrapper/PageWrapper';
import InfoCard from '../../components/shared/InfoCard/InfoCard';
import Tag from '../../components/shared/Tag/Tag';
import { BiSolidShoppingBag, BiSolidTag } from 'react-icons/bi';
import ItemCard from '../../components/shared/ItemCard/ItemCard';
import ProfileFormModal from '../../components/shared/ProfileFormModal/ProfileFormModal';
import ApiUtils from '../../utils/apiUtils';
import { toast } from 'react-toastify';

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
  const { csrf_token } = usePage().props;
  const [showProfileModal, setShowProfileModal] =
    React.useState<boolean>(false);

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
        if (response.success) {
          // partial reload
          router.reload({
            only: ['cart', 'cart_items'],
          });
          toast.success('Item added to your cart');
        } else {
          if (response.code === 'ERR_NO_PROFILE') {
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
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl flex items-center gap-1">
            <BiSolidTag /> {category.category_name}
          </h1>
          <p>{category.category_description}</p>
          <Tag
            iconElement={<BiSolidShoppingBag />}
            tagText={`Number of related items: ${item_count}`}
          />
          <hr />
          <div className="flex flex-1 items-center justify-between">
            <h2 className="text-2xl">
              Most Recently Added Items for this category
            </h2>
            <Link
              className="hover:underline w-fit"
              href={`/item_categories/${category.id}/items`}
            >
              View All Items in this Category
            </Link>
          </div>
          <div>
            {related_items.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {related_items.map((item) => (
                  <ItemCard
                    key={`related-item-${item.id}`}
                    item={item}
                    addItemAction={(orderItem) =>
                      execAddItemToCart(orderItem, 1)
                    }
                  />
                ))}
              </div>
            ) : (
              <InfoCard
                cardType="info"
                title="No related items that have been recently added for this category"
              />
            )}
          </div>
          <ProfileFormModal
            dialogCancelAction={() => setShowProfileModal(false)}
            dialogConfirmAction={() => setShowProfileModal(false)}
            dialogContent={
              'Please update your profile so that the appropriate tax information can be displayed'
            }
            dialogOpen={showProfileModal}
            dialogTitle={'Update Profile'}
          />
        </div>
      ) : (
        <InfoCard
          cardType={'error'}
          title={error ? error : 'Item Category Not Found'}
        />
      )}
    </PageWrapper>
  );
};

export default ItemCategoryDetail;
