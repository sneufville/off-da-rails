/**
 * @author  sai
 * created  2024-07-18
 * project  off_da_rails_coffee
 */

import React from 'react';
import { router, usePage } from '@inertiajs/react';
import PageWrapper from '../../components/shared/PageWrapper/PageWrapper';
import { Cart, CustomerOrderItem } from '../../@types/offDaRails';
import CartItemCard from '../../components/shared/CartItemCard/CartItemCard';
import InfoCard from '../../components/shared/InfoCard/InfoCard';
import ApiUtils from '../../utils/apiUtils';
import AppLoader from '../../components/shared/AppLoader/AppLoader';

const CustomerCart = (): React.ReactNode => {
  const { cart, cart_items } = usePage().props;
  const _cart = cart as Cart;
  const _cart_items = cart_items as CustomerOrderItem[];
  const [reqInProgress, setReqInProgress] = React.useState<boolean>(false);

  const execDeleteFromCart = React.useCallback((item: CustomerOrderItem) => {
    console.log('try to delete item from cart');
    const _deleteAction = async () => {
      const token = document
        .querySelector('meta[name="csrf-token"]')!
        .getAttribute('content');
      if (!token) return;
      const apiResponse = await ApiUtils.removeItemFromCart({
        itemId: item.id,
        token,
      });

      if (apiResponse.success) {
        router.reload({
          only: ['cart', 'cart_items'],
        });
      }
    };
    setReqInProgress(true);
    _deleteAction()
      .then()
      .finally(() => setReqInProgress(false));
  }, []);

  return (
    <PageWrapper>
      <h1 className="text-4xl">Customer Cart</h1>
      <p>Here's what you have in your cart so far...</p>
      <hr />
      {_cart_items.length ? (
        <div className="grid grid-cols-1 gap-2">
          {_cart_items.map((item) => (
            <CartItemCard
              key={`cart-item-${item.id}`}
              item={item}
              deleteItemAction={(orderItem) => execDeleteFromCart(orderItem)}
            />
          ))}
        </div>
      ) : (
        <InfoCard cardType={'info'} title={'Nothing in your cart yet'} />
      )}
      <AppLoader open={reqInProgress} />
    </PageWrapper>
  );
};

export default CustomerCart;
