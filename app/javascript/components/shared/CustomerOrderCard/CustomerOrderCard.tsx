/**
 * @author  sai
 * created  2024-08-09
 * project  off_da_rails_coffee
 */

import React from 'react';
import type {
  CustomerOrder,
  CustomerOrderItem,
} from '../../../@types/offDaRails';
import { BiCheckDouble, BiChevronDown } from 'react-icons/bi';
import StackedLabel from '../StackedLabel/StackedLabel';
import DateUtils from '../../../utils/dateUtils';
import TaxLabel from '../TaxLabel/TaxLabel';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import SimpleCheckoutItem from '../SimpleCheckoutItem/SimpleCheckoutItem';

type CustomerOrderCardProps = {
  order: CustomerOrder;
  orderItems: CustomerOrderItem[];
  customerNameOrEmail: string;
};

const CustomerOrderCard: React.FC<CustomerOrderCardProps> = ({
  order,
  orderItems,
  customerNameOrEmail,
}) => {
  return (
    <div className="p-2 flex flex-col rounded bg-slate-50 gap-2">
      <div className="flex items-center justify-between px-2">
        <h1 className="font-medium">Order # {order.id}</h1>
        <span className="px-2 py-1 rounded bg-green-800 text-white flex items-center gap-1">
          Paid
          <BiCheckDouble />
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <StackedLabel
          label={'Order Placed'}
          value={DateUtils.formatDateShort(order.updated_at)}
        />
        <StackedLabel
          label={'Number of Items'}
          value={`${orderItems.length}`}
        />
        <StackedLabel label={'Placed By'} value={customerNameOrEmail} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <StackedLabel
          label={'Order Total'}
          value={`$${Number(order.order_total).toFixed(2)}`}
        />
        <div className="flex items-center gap-2">
          {order.total_gst > 0 ? (
            <TaxLabel taxLabel={'Total GST'} taxAmount={order.total_gst} />
          ) : null}
          {order.total_hst > 0 ? (
            <TaxLabel taxLabel={'Total HST'} taxAmount={order.total_hst} />
          ) : null}
          {order.total_pst > 0 ? (
            <TaxLabel taxLabel={'Total PST'} taxAmount={order.total_pst} />
          ) : null}
        </div>
      </div>
      <Disclosure
        as="div"
        className="p-2 bg-slate-100 roudned"
        defaultOpen={false}
      >
        <DisclosureButton className="group flex w-full items-center justify-between">
          <span className="font-bold text-xl">
            Items in your order:{' '}
            <span className="p-1 rounded bg-slate-700 text-white">
              {orderItems.length}
            </span>
          </span>
          <BiChevronDown className="group-data-[open]:rotate-180" size={32} />
        </DisclosureButton>
        <DisclosurePanel
          transition
          className="origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
        >
          <div className="flex flex-col gap-4">
            {orderItems.length ? (
              <div className="grid grid-cols-1 gap-2">
                {orderItems.map((orderItem) => (
                  <SimpleCheckoutItem
                    key={`order-item-${orderItem.id}`}
                    item={orderItem}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
};

export default CustomerOrderCard;
