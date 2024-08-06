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
import AppButton from '../../components/shared/AppButton/AppButton';
import { BiSolidArrowToRight } from 'react-icons/bi';

const CustomerCart = (): React.ReactNode => {
  const { cart, cart_items } = usePage().props;
  const _cart = cart as Cart;
  const _cart_items = cart_items as CustomerOrderItem[];
  const [reqInProgress, setReqInProgress] = React.useState<boolean>(false);

  const execUpdateCartItem = React.useCallback(
    (item: CustomerOrderItem, itemCount: number) => {
      const _updateAction = async () => {
        const token = ApiUtils.getCSRFToken();
        if (!token) return;
        const apiResponse = await ApiUtils.editCartItem({
          itemCount,
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
      _updateAction().finally(() => setReqInProgress(false));
    },
    []
  );

  const execDeleteFromCart = React.useCallback((item: CustomerOrderItem) => {
    console.log('try to delete item from cart');
    const _deleteAction = async () => {
      const token = ApiUtils.getCSRFToken();
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

  const onNavToCheckout = React.useCallback(() => {
    console.info('onNavToCheckout called');
    if (!_cart_items.length) return;
    router.visit('/customer_orders/checkout');
  }, [_cart_items]);

  return (
    <PageWrapper>
      <div className="flex flex-col gap-y-4">
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
                setQuantityAction={(quantity) =>
                  execUpdateCartItem(item, quantity)
                }
              />
            ))}
          </div>
        ) : (
          <InfoCard cardType={'info'} title={'Nothing in your cart yet'} />
        )}
        <div>
          <AppButton
            iconelement={<BiSolidArrowToRight className="text-white" />}
            onClick={() => onNavToCheckout()}
          >
            Proceed to checkout
          </AppButton>
        </div>
        <AppLoader open={reqInProgress} />
      </div>
    </PageWrapper>
  );
};

export default CustomerCart;
