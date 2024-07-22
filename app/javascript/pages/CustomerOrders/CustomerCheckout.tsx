/**
 * @author  sai
 * created  2024-07-22
 * project  off_da_rails_coffee
 */

import React from 'react';
import PageWrapper from '../../components/shared/PageWrapper/PageWrapper';
import { usePage } from '@inertiajs/react';
import {
  Cart,
  CustomerOrderItem,
  CustomerProfile,
} from '../../@types/offDaRails';
import InfoCard from '../../components/shared/InfoCard/InfoCard';
import SimpleCheckoutItem from '../../components/shared/SimpleCheckoutItem/SimpleCheckoutItem';
import OrderTotalCard from '../../components/shared/OrderTotalCard/OrderTotalCard';

const CustomerCheckout = (): React.ReactNode => {
  const { cart, cart_items, current_user, user_profile } = usePage().props;
  const _cart = cart as Cart;
  const _cartItems = cart_items as CustomerOrderItem[];
  const _profile = user_profile as CustomerProfile;

  return (
    <PageWrapper>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-4xl">Checkout</h1>
        <hr />
        {_cartItems.length ? (
          <div className="grid grid-cols-1 gap-y-4">
            <p>{_cartItems.length} item(s) in your cart</p>
            <div className="grid grid-cols-1 gap-y-4">
              {_cartItems.map((item) => (
                <SimpleCheckoutItem
                  key={`checkout-item-${item.id}`}
                  item={item}
                />
              ))}
            </div>
            <OrderTotalCard cart={_cart} />
          </div>
        ) : (
          <InfoCard cardType={'info'} title={'Empty Cart'} />
        )}
      </div>
    </PageWrapper>
  );
};

export default CustomerCheckout;
