/**
 * @author  sai
 * created  2024-07-18
 * project  off_da_rails_coffee
 */

import React from 'react';
import { usePage } from '@inertiajs/react';
import PageWrapper from '../../components/shared/PageWrapper/PageWrapper';
import { Cart, CustomerOrderItem } from '../../@types/offDaRails';
import CartItemCard from '../../components/shared/CartItemCard/CartItemCard';
import InfoCard from '../../components/shared/InfoCard/InfoCard';

const CustomerCart = (): React.ReactNode => {
  const { cart, cart_items } = usePage().props;
  const _cart = cart as Cart;
  const _cart_items = cart_items as CustomerOrderItem[];
  return (
    <PageWrapper>
      <h1 className="text-4xl">Customer Cart</h1>
      <p>Here's what you have in your cart so far...</p>
      <hr />
      {_cart_items.length ? (
        <div className="grid grid-cols-1 gap-2">
          {_cart_items.map((item) => (
            <CartItemCard key={`cart-item-${item.id}`} item={item} />
          ))}
        </div>
      ) : (
        <InfoCard cardType={'info'} title={'Nothing in your cart yet'} />
      )}
    </PageWrapper>
  );
};

export default CustomerCart;
