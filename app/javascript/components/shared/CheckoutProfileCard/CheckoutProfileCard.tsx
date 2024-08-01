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
  Province,
  ProvinceTaxEntry,
  User,
} from '../../../@types/offDaRails';
import { BiChevronDown, BiSolidSave } from 'react-icons/bi';
import ApiUtils from '../../../utils/apiUtils';
import AppButton from '../AppButton/AppButton';

type CheckoutProfileCardProps = {
  user: User;
  profile?: CustomerProfile;
  updateProfileAction: (profileData: CustomerProfile) => void;
  isUpdatingProfile: boolean;
};

const CheckoutProfileCard: React.FC<CheckoutProfileCardProps> = ({
  user,
  profile,
  updateProfileAction,
  isUpdatingProfile,
}) => {
  const [provinces, setProvinces] = React.useState<Province[]>([]);
  const [profileData, setProfileData] = React.useState<CustomerProfile>({
    city: '',
    country: '',
    created_at: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    province_id: 0,
    street_address_1: '',
    street_address_2: '',
    updated_at: '',
  });

  React.useEffect(() => {
    if (profile) {
      setProfileData(profile);
    }
  }, [profile]);

  React.useEffect(() => {
    ApiUtils.fetchProvinces().then((results) => setProvinces(results));
  }, []);

  return (
    <div>
      <Disclosure
        as="div"
        className="p-2 bg-slate-50 roudned"
        defaultOpen={true}
      >
        <DisclosureButton className="group flex w-full items-center justify-between">
          <span className="font-bold text-xl">
            Customer Information & Shipping{' '}
            {profile ? (
              <span className="text-slate-600 font-normal p-1 rounded bg-slate-200">
                Ship to: {profile.first_name} {profile.last_name}
              </span>
            ) : null}
          </span>
          <BiChevronDown className="group-data-[open]:rotate-180" size={32} />
        </DisclosureButton>
        <DisclosurePanel
          transition
          className="origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
        >
          <div className="flex flex-col gap-4">
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
            <h3>Billing & Shipping Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="w-full flex flex-col gap-1">
                <input
                  className="h-10 rounded"
                  disabled={isUpdatingProfile}
                  type="text"
                  name="street_address_1"
                  id="streetAddress1"
                  placeholder="Street Address Line 1"
                  value={profileData.street_address_1}
                  onChange={(e) =>
                    setProfileData((prevState) => ({
                      ...prevState,
                      street_address_1: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <input
                  className="h-10 rounded"
                  disabled={isUpdatingProfile}
                  type="text"
                  name="street_address_2"
                  id="streetAddress2"
                  placeholder="Street Address Line 2"
                  value={profileData.street_address_2}
                  onChange={(e) =>
                    setProfileData((prevState) => ({
                      ...prevState,
                      street_address_2: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <input
                  className="h-10 rounded"
                  disabled={isUpdatingProfile}
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City"
                  value={profileData.city}
                  onChange={(e) =>
                    setProfileData((prevState) => ({
                      ...prevState,
                      city: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <select
                  className="h-10 rounded px-2"
                  disabled={isUpdatingProfile}
                  name="province_id"
                  id="provinceId"
                  value={profileData.province_id}
                  onChange={(e) =>
                    setProfileData((prevState) => ({
                      ...prevState,
                      province_id: parseInt(e.target.value),
                    }))
                  }
                >
                  <option>--</option>
                  {provinces.map((province) => (
                    <option
                      key={`province-${province.abbreviation}`}
                      value={province.id}
                    >
                      {province.province}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full flex flex-col gap-1">
                <input
                  className="h-10 rounded"
                  disabled={isUpdatingProfile}
                  type="text"
                  name="country"
                  id="country"
                  placeholder="Country"
                  value={profileData.country}
                  onChange={(e) =>
                    setProfileData((prevState) => ({
                      ...prevState,
                      country: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div>
              <AppButton
                disabled={isUpdatingProfile}
                iconElement={<BiSolidSave className="text-white" />}
                onClick={() => {
                  if (
                    typeof profileData.province_id === 'undefined' ||
                    profileData.province_id < 1
                  )
                    return;
                  updateProfileAction(profileData);
                }}
              >
                Update Profile
              </AppButton>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
};

export default CheckoutProfileCard;
