/**
 * @author  sai
 * created  2024-07-15
 * project  off_da_rails_coffee
 */

import React from 'react';
import { BsCheckCircleFill, BsInfoSquare } from 'react-icons/bs';
import type { CustomerProfile, Province } from '../../@types/offDaRails';
import PageWrapper from '../../components/shared/PageWrapper/PageWrapper';
import ApiUtils from '../../utils/apiUtils';

type CustomerProfileProps = {
  customer_profile?: CustomerProfile;
};

const CustomerProfile: React.FC<CustomerProfileProps> = ({
  customer_profile,
}) => {
  const [profile, setProfile] = React.useState<CustomerProfile>({
    city: '',
    country: '',
    created_at: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    province_id: -1,
    street_address_1: '',
    street_address_2: '',
    updated_at: '',
  });
  const [provinces, setProvinces] = React.useState<Array<Province>>([]);

  React.useEffect(() => {
    ApiUtils.fetchProvinces()
      .then((_provinces) => setProvinces(_provinces))
      .catch(() => {
        console.error('Failed to retrieve the list of provinces');
      });
  }, []);

  React.useEffect(() => {
    if (customer_profile) setProfile(customer_profile);
  }, [customer_profile]);

  const submitProfileForm = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('try to submit profile form');
    },
    [profile]
  );

  return (
    <PageWrapper>
      <div className="flex flex-col gap-y-4">
        <h1 className="text-4xl">My Profile</h1>
        {!customer_profile ? (
          <div className="p-2 bg-blue-50 flex items-center gap-x-2 rounded">
            <BsInfoSquare className="text-blue-600" />
            <div>
              <p className="text-lg text-blue-600 font-bold">
                Customer Profile Not Set
              </p>
              <p className="text-md text-blue-600">
                Looks like you haven't set up a customer profile yet.
              </p>
            </div>
          </div>
        ) : undefined}
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => submitProfileForm(e)}
        >
          <h3 className="text-xl font-semibold">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full flex flex-col space-y-1">
              <label htmlFor="firstName">First Name*</label>
              <input
                className="h-10 p-1 rounded"
                type="text"
                name="first_name"
                id="firstName"
                placeholder="First Name"
                value={profile.first_name}
                onChange={(e) =>
                  setProfile((prevState) => ({
                    ...prevState,
                    first_name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="lastName">Last Name*</label>
              <input
                className="h-10 p-1 rounded"
                type="text"
                name="last_name"
                id="lastName"
                placeholder="Last Name"
                value={profile.last_name}
                onChange={(e) =>
                  setProfile((prevState) => ({
                    ...prevState,
                    last_name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="phoneNumber">Phone</label>
              <input
                className="h-10 p-1 rounded"
                type="tel"
                name="phone_number"
                id="phoneNumber"
                placeholder="eg. 204-555-1234"
                value={profile.phone_number}
                onChange={(e) =>
                  setProfile((prevState) => ({
                    ...prevState,
                    phone_number: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <h3 className="text-xl font-semibold">Address Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <label htmlFor="streetAddress1">Street Address Line 1</label>
              <input
                className="h-10 p-1 rounded"
                type="text"
                name="street_address_1"
                id="streetAddress1"
                placeholder="Street Address 1"
                value={profile.street_address_1}
                onChange={(e) =>
                  setProfile((prevState) => ({
                    ...prevState,
                    street_address_1: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="streetAddress2">Street Address Line 2</label>
              <input
                className="h-10 p-1 rounded"
                type="text"
                name="street_address_2"
                id="streetAddress2"
                placeholder="eg. Unit 1000"
                value={profile.street_address_2}
                onChange={(e) =>
                  setProfile((prevState) => ({
                    ...prevState,
                    street_address_2: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="city">City</label>
              <input
                className="h-10 p-1 rounded"
                type="text"
                name="city"
                id="city"
                placeholder="Eg. Winnipeg"
                value={profile.city}
                onChange={(e) =>
                  setProfile((prevState) => ({
                    ...prevState,
                    city: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="province">Province</label>
              <select
                className="h-10 p-1 rounded"
                name="province"
                id="province"
                value={profile.province_id}
                onChange={(event) =>
                  setProfile((prevState) => ({
                    ...prevState,
                    province_id: parseInt(event.target.value),
                  }))
                }
              >
                <option value="">Select Province</option>
                {provinces.map((province) => (
                  <option
                    key={`province-${province.abbreviation}`}
                    value={province.id}
                  >
                    {province.province} ({province.abbreviation})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                placeholder="eg. Canada"
                value={profile.country}
                onChange={(e) =>
                  setProfile((prevState) => ({
                    ...prevState,
                    country: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="w-full">
            <button
              className="p-2 rounded bg-blue-500 text-white flex items-center gap-x-2"
              type="submit"
            >
              <BsCheckCircleFill />
              {customer_profile ? 'Update' : 'Create'} Customer Profile
            </button>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};

export default CustomerProfile;
