/**
 * @author  sai
 * created  2024-07-22
 * project  off_da_rails_coffee
 */

import React from 'react';
import PageWrapper from '../../components/shared/PageWrapper/PageWrapper';
import { router, usePage } from '@inertiajs/react';
import {
  Cart,
  CustomerOrderItem,
  CustomerProfile,
  User,
} from '../../@types/offDaRails';
import InfoCard from '../../components/shared/InfoCard/InfoCard';
import SimpleCheckoutItem from '../../components/shared/SimpleCheckoutItem/SimpleCheckoutItem';
import OrderTotalCard from '../../components/shared/OrderTotalCard/OrderTotalCard';
import CheckoutProfileCard from '../../components/shared/CheckoutProfileCard/CheckoutProfileCard';
import ApiUtils from '../../utils/apiUtils';
import { toast } from 'react-toastify';
import AppLoader from '../../components/shared/AppLoader/AppLoader';

const CustomerCheckout = (): React.ReactNode => {
  const { cart, cart_items, current_user, user_profile } = usePage().props;
  const _cart = cart as Cart;
  const _cartItems = cart_items as CustomerOrderItem[];
  const _profile = user_profile as CustomerProfile;
  const _user = current_user as User;

  const [updatingProfile, setUpdatingProfile] = React.useState<boolean>(false);
  const [placingOrder, setPlacingOrder] = React.useState<boolean>(false);
  const updateProfile = React.useCallback(
    (profile: CustomerProfile) => {
      if (updatingProfile) return;
      const token = ApiUtils.getCSRFToken();
      if (!token) return;

      setUpdatingProfile(true);

      ApiUtils.updateProfile(token, profile)
        .then((result) => {
          console.info('update profile response: ', result);
          if (result.success) {
            router.reload({
              only: ['user_profile'],
            });
          }
        })
        .finally(() => setUpdatingProfile(false));
    },
    [updatingProfile]
  );

  const checkoutAction = React.useCallback(() => {
    if (placingOrder) return;
    const token = ApiUtils.getCSRFToken();
    if (!token) return;
    setPlacingOrder(true);
    ApiUtils.placeOrder(token)
      .then((result) => {
        if (result.success) {
          toast.success('Order placed successfully', {
            onClose: () => {
              router.visit('/customer_orders/orders');
            },
          });
          router.reload({
            only: ['cart', 'customer_cart'],
          });
        } else {
          toast.error(result.errors?.join(' '));
        }
      })
      .finally(() => setPlacingOrder(false));
  }, [placingOrder]);

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
            <CheckoutProfileCard
              isUpdatingProfile={updatingProfile}
              profile={_profile}
              updateProfileAction={(profileData) => updateProfile(profileData)}
              user={_user}
            />
            <OrderTotalCard
              cart={_cart}
              checkoutAction={() => checkoutAction()}
              provinceTaxEntries={[]}
            />
          </div>
        ) : (
          <InfoCard cardType={'info'} title={'Empty Cart'} />
        )}
      </div>
      <AppLoader open={placingOrder} loaderContent={'Placing your order...'} />
    </PageWrapper>
  );
};

export default CustomerCheckout;
