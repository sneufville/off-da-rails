/**
 * @author  sai
 * created  2024-08-07
 * project  off_da_rails_coffee
 */
import React from 'react';
import { usePage } from '@inertiajs/react';
import PageWrapper from '../../components/shared/PageWrapper/PageWrapper';
import {
  CustomerOrder,
  CustomerOrderItem,
  CustomerProfile,
  User,
} from '../../@types/offDaRails';
import InfoCard from '../../components/shared/InfoCard/InfoCard';
import CustomerOrderCard from '../../components/shared/CustomerOrderCard/CustomerOrderCard';

const CustomerOrderListing = (): React.ReactNode => {
  const { current_user, orders, order_items_collection } = usePage().props;
  const _currentUser = current_user as User;
  const _orders = orders as CustomerOrder[];
  const _orderItemsCollection = order_items_collection as Record<
    number,
    CustomerOrderItem[]
  >;

  console.log('orders: ', orders);
  console.log('order items collection: ', order_items_collection);

  const getItemsForOrder = React.useCallback(
    (orderId: number): CustomerOrderItem[] => {
      try {
        return _orderItemsCollection[orderId];
      } catch (e) {
        return [];
      }
    },
    [_orderItemsCollection]
  );

  return (
    <PageWrapper>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-4xl text-slate-700">My Orders</h1>
        {_orders.length ? (
          <div className="grid grid-cols-1 gap-2">
            {_orders.map((order) => (
              <CustomerOrderCard
                key={`order-${order.id}`}
                order={order}
                orderItems={getItemsForOrder(order.id)}
                customerNameOrEmail={_currentUser.email}
              />
            ))}
          </div>
        ) : (
          <InfoCard
            cardType={'info'}
            title={'No Orders Yet'}
            content={
              "Looks like you haven't placed any orders yet. Feel free to browse our collection of fine Off da Rails products"
            }
          />
        )}
      </div>
    </PageWrapper>
  );
};

export default CustomerOrderListing;
