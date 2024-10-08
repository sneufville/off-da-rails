/**
 * @author  sai
 * created  2024-07-10
 * project  off_da_rails_coffee
 */

import * as React from 'react';
import type { FC as ReactFC } from 'react';
import type { Item } from '../../@types/offDaRails';
import PageWrapper from '../../components/shared/PageWrapper/PageWrapper';
import ItemCard from '../../components/shared/ItemCard/ItemCard';
import coffeeSplash from '../../components/images/coffee-splash.jpg';
import moreCoffee from '../../components/images/more-coffee.jpg';
import ApiUtils from '../../utils/apiUtils';
import { router, usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';
import ProfileFormModal from '../../components/shared/ProfileFormModal/ProfileFormModal';

type HomeProps = {
  name: string;
  items: Array<Item>;
};

const Home: ReactFC<HomeProps> = ({ name, items }) => {
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
      <div className="flex flex-col gap-y-4">
        <img
          alt={'welcome to off da rails'}
          className="h-80 object-cover"
          src={coffeeSplash}
        />
        <h1 className="text-4xl">Welcome to Off Da Rails Coffee Co</h1>
        <p className="text-lg">
          Off Da Rails Coffee Company, a (fictional) retail coffee company based
          in Winnipeg specializing in what they call, the Awesome Coffee
          Experience, has requested the creation of an e-commerce website which
          will allow them to showcase and sell their products.{' '}
        </p>
        <div className="flex flex-col gap-2">
          <img
            alt={'more coffee'}
            className="object-cover h-40"
            src={moreCoffee}
          />
          <h2 className="text-2xl">Some of our finest products</h2>
          <p>
            Below is a list of some of our finest products for you to check out.
          </p>
          {items.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {items.map((item) => (
                <ItemCard
                  key={`item-${item.id}`}
                  item={item}
                  addItemAction={(orderItem) => execAddItemToCart(orderItem)}
                />
              ))}
            </div>
          ) : (
            <div>No Items Available</div>
          )}
        </div>
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

export default Home;
