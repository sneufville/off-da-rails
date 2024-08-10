/**
 * @author  sai
 * created  2024-07-11
 * project  off_da_rails_coffee
 */
import React from 'react';
import { router, usePage } from '@inertiajs/react';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { BiChevronDown, BiFilter, BiReset } from 'react-icons/bi';
import clsx from 'clsx';
import type { ItemCategory, Item } from '../../@types/offDaRails';
import InfoCard from '../../components/shared/InfoCard/InfoCard';
import ItemCard from '../../components/shared/ItemCard/ItemCard';
import PageWrapper from '../../components/shared/PageWrapper/PageWrapper';
import Paginator from '../../components/shared/Paginator/Paginator';
import ApiUtils from '../../utils/apiUtils';
import ProfileFormModal from '../../components/shared/ProfileFormModal/ProfileFormModal';
import { toast } from 'react-toastify';

type ItemListingProps = {
  current_page?: string;
  items: Array<Item>;
  item_categories: Array<ItemCategory>;
  selected_item_category?: string;
  item_name_filter?: string;
  item_count: number;
};

const ItemIndex: React.FC<ItemListingProps> = ({
  current_page,
  item_categories,
  items,
  selected_item_category,
  item_name_filter,
  item_count,
}) => {
  const { csrf_token } = usePage().props;
  console.log('load item listing with csrf_token: ', csrf_token);
  const [itemNameFilter, setItemNameFilter] = React.useState<string>('');
  const [categoryQuery, setCategoryQuery] = React.useState<string>('');
  const [selectedCategory, setSelectedCategory] =
    React.useState<ItemCategory | null>(null);
  const [showProfileModal, setShowProfileModal] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (item_name_filter) setItemNameFilter(item_name_filter);
  }, [item_name_filter]);

  React.useEffect(() => {
    if (selected_item_category) {
      const _category = item_categories.find(
        (cat) => `${cat.id}` === selected_item_category
      );
      if (_category) setSelectedCategory(_category);
    }
  }, [selected_item_category, item_categories]);

  // derived filtered categories
  const filteredCategories =
    categoryQuery === ''
      ? item_categories
      : item_categories.filter((cat) =>
          cat.category_name.includes(categoryQuery.toLowerCase())
        );

  /**
   * @function execFilterItems
   * @description Handles item filter
   */
  const execFilterItems = React.useCallback(() => {
    router.visit(`/items`, {
      method: 'get',
      data: {
        item_category: selectedCategory?.id,
        item_name: itemNameFilter,
      },
    });
  }, [selectedCategory, itemNameFilter]);

  const execResetFilters = React.useCallback(() => {
    setSelectedCategory(null);
    setCategoryQuery('');
    setItemNameFilter('');
    router.visit(`/items`);
  }, []);

  const getCategoryForItem = React.useCallback(
    (item: Item): ItemCategory | undefined => {
      return item_categories.find((c) => c.id === item.id);
    },
    [item_categories]
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
      <div>
        <h1 className="text-4xl">Items</h1>
        <div className="flex flex-col gap-y-2 p-2 bg-gray-50 rounded">
          <input
            type="text"
            className="p-2 rounded w-full"
            onChange={(e) => setItemNameFilter(e.target.value)}
            placeholder="Filter Items"
            value={itemNameFilter}
          />
          <select className="p-2 rounded w-full">
            <option>No Filter</option>
            <option value="">New Products</option>
            <option value="">Recently Updated</option>
          </select>
          <Combobox
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value)}
            onClose={() => setCategoryQuery('')}
          >
            <div className="relative">
              <ComboboxInput
                displayValue={(cat: ItemCategory) => cat?.category_name}
                onChange={(event) => setCategoryQuery(event.target.value)}
                className={clsx(
                  'w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-slate-800',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                )}
              />
              <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                <BiChevronDown className="size-4 fill-white/60 group-data-[hover]:fill-white" />
              </ComboboxButton>
            </div>
            <ComboboxOptions
              anchor="bottom"
              transition
              className={clsx(
                'w-[var(--input-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
              )}
            >
              {filteredCategories.map((cat) => (
                <ComboboxOption
                  key={`category-${cat.id}`}
                  value={cat}
                  className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                >
                  <div className="text-sm/6 border-2 border-gray-200">
                    {cat.category_name}
                  </div>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </Combobox>
          <div className="flex items-center gap-x-2">
            <button
              className="p-2 rounded bg-blue-500 text-white w-full flex items-center gap-x-2"
              onClick={execFilterItems}
            >
              <BiFilter />
              Filter
            </button>
            <button
              className="p-2 rounded bg-gray-700 text-white w-full flex items-center gap-x-2"
              onClick={execResetFilters}
            >
              <BiReset />
              Reset
            </button>
          </div>
        </div>
        <section className="flex flex-col gap-y-2">
          <div className="flex items-center">
            <span className="p-2 bg-gray-400 rounded">
              {item_count} item{item_count !== 1 ? 's' : ''} found
            </span>
          </div>
          <div>
            {items.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item) => (
                  <ItemCard
                    key={`item-${item.id}`}
                    item={item}
                    itemCategory={getCategoryForItem(item)}
                    addItemAction={(item) => execAddItemToCart(item)}
                  />
                ))}
              </div>
            ) : (
              <InfoCard
                cardType={'info'}
                title={'No Items Found'}
                content={`No results were found with the filters applied.`}
              />
            )}
          </div>
        </section>
      </div>
      <div>
        <Paginator
          currentPage={current_page}
          itemsPerPage={20}
          pageTarget={'items'}
          totalCount={item_count}
        />
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
    </PageWrapper>
  );
};

export default ItemIndex;
