/**
 * @author  sai
 * created  2024-07-22
 * project  off_da_rails_coffee
 */

import React from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import {
  CustomerProfile,
  ProvinceTaxEntry,
  User,
} from '../../../@types/offDaRails';
import { BiChevronDown } from 'react-icons/bi';

type CheckoutProfileCardProps = {
  user: User;
  profile?: CustomerProfile;
  updateProfileAction?: () => void;
};

const CheckoutProfileCard: React.FC<CheckoutProfileCardProps> = ({
  user,
  profile,
  updateProfileAction,
}) => {
  return (
    <div>
      <Disclosure
        as="div"
        className="p-2 bg-slate-50 roudned"
        defaultOpen={false}
      >
        <DisclosureButton className="group flex w-full items-center justify-between">
          <span className="font-bold text-xl">
            Customer Information & Shipping
          </span>
          <BiChevronDown className="group-data-[open]:rotate-180" size={32} />
        </DisclosureButton>
        <DisclosurePanel
          transition
          className="origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
        >
          <div className="flex flex-col gap-2">
            <h3>Basic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div>
                <p>
                  {profile?.first_name} {profile?.last_name}
                </p>
                <span>Name</span>
              </div>
              <div>
                <p>{user?.email}</p>
                <span>Email Address</span>
              </div>
            </div>
            <hr />
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
};

export default CheckoutProfileCard;
