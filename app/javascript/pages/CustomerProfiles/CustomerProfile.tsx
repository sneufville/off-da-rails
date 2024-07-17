/**
 * @author  sai
 * created  2024-07-15
 * project  off_da_rails_coffee
 */

import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { BsCheckCircleFill, BsInfoSquare } from 'react-icons/bs';
import type {
  AppDialogType,
  CustomerProfile,
  Province,
  User,
} from '../../@types/offDaRails';
import PageWrapper from '../../components/shared/PageWrapper/PageWrapper';
import ApiUtils from '../../utils/apiUtils';
import FormError from '../../components/shared/FormError/FormError';
import AppDialog from '../../components/shared/AppDialog/AppDialog';

type CustomerProfileProps = {
  profile_updated?: boolean;
  customer_profile?: CustomerProfile;
  form_data?: CustomerProfile;
  profile_id?: number;
  submission_errors?: Record<string, string[]>;
};

type CustomerProfileUpdateResponse = {
  content: string;
  dialogType: AppDialogType;
  title: string;
};

const CustomerProfile: React.FC<CustomerProfileProps> = ({
  customer_profile,
  profile_id,
  submission_errors,
  form_data,
  profile_updated,
}) => {
  const { current_user, csrf_token } = usePage().props;
  const _user = current_user as User;

  const {
    data: formData,
    setData: setFormData,
    post: postForm,
    processing,
    put: updateForm,
  } = useForm({
    city: '',
    country: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    province_id: 0,
    street_address_1: '',
    street_address_2: '',
  });

  const [provinces, setProvinces] = React.useState<Array<Province>>([]);
  const [responseDialogContent, setResponseDialogContent] =
    React.useState<CustomerProfileUpdateResponse>({
      title: '',
      content: '',
      dialogType: 'info',
    });
  const [responseDialogOpen, setResponseDialogOpen] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    ApiUtils.fetchProvinces()
      .then((_provinces) => setProvinces(_provinces))
      .catch(() => {
        console.error('Failed to retrieve the list of provinces');
      });
  }, []);

  React.useEffect(() => {
    if (submission_errors && Object.keys(submission_errors).length) {
      setResponseDialogContent({
        title: 'Profile Not Updated',
        content: 'There were errors with your submission.',
        dialogType: 'error',
      });
      setResponseDialogOpen(true);
    } else if (profile_updated) {
      setResponseDialogContent({
        title: 'Profile Updated',
        content: 'Your profile was successfully updated',
        dialogType: 'success',
      });
      setResponseDialogOpen(true);
    }
  }, [profile_updated, submission_errors, customer_profile]);

  React.useEffect(() => {
    if (typeof customer_profile !== 'undefined') {
      setFormData({
        first_name: customer_profile.first_name ?? '',
        last_name: customer_profile.last_name ?? '',
        province_id: customer_profile.province_id ?? 0,
        city: customer_profile.city ?? '',
        country: customer_profile.country ?? '',
        phone_number: customer_profile.phone_number ?? '',
        street_address_1: customer_profile.street_address_1 ?? '',
        street_address_2: customer_profile.street_address_2 ?? '',
      });
    }
  }, [customer_profile]);

  const submitProfileForm = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (formData.province_id < 1) {
        return console.error('Invalid Province Id');
      }
      const _token = csrf_token as string;
      const data = { profile: formData, _token };
      postForm('/customer_profiles/me', { data });
    },
    [formData, _user, csrf_token]
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
                value={formData.first_name}
                onChange={(e) => setFormData('first_name', e.target.value)}
              />
              {submission_errors?.first_name ? (
                <FormError
                  fieldLabel="First Name"
                  message={submission_errors?.first_name[0]}
                />
              ) : undefined}
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="lastName">Last Name*</label>
              <input
                className="h-10 p-1 rounded"
                type="text"
                name="last_name"
                id="lastName"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={(e) => setFormData('last_name', e.target.value)}
              />
              {submission_errors?.last_name ? (
                <FormError
                  fieldLabel="Last Name"
                  message={submission_errors.last_name[0]}
                />
              ) : undefined}
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="phoneNumber">Phone</label>
              <input
                className="h-10 p-1 rounded"
                type="tel"
                name="phone_number"
                id="phoneNumber"
                placeholder="eg. 204-555-1234"
                value={formData.phone_number}
                onChange={(e) => setFormData('phone_number', e.target.value)}
              />
              {submission_errors?.phone_number ? (
                <FormError
                  fieldLabel="Last Name"
                  message={submission_errors.phone_number[0]}
                />
              ) : undefined}
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
                value={formData.street_address_1}
                onChange={(e) =>
                  setFormData('street_address_1', e.target.value)
                }
              />
              {submission_errors?.street_address_1 ? (
                <FormError
                  fieldLabel="Last Name"
                  message={submission_errors.street_address_1[0]}
                />
              ) : undefined}
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="streetAddress2">Street Address Line 2</label>
              <input
                className="h-10 p-1 rounded"
                type="text"
                name="street_address_2"
                id="streetAddress2"
                placeholder="eg. Unit 1000"
                value={formData.street_address_2}
                onChange={(e) =>
                  setFormData('street_address_2', e.target.value)
                }
              />
              {submission_errors?.street_address_2 ? (
                <FormError
                  fieldLabel="Last Name"
                  message={submission_errors.street_address_2[0]}
                />
              ) : undefined}
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="city">City</label>
              <input
                className="h-10 p-1 rounded"
                type="text"
                name="city"
                id="city"
                placeholder="Eg. Winnipeg"
                value={formData.city}
                onChange={(e) => setFormData('city', e.target.value)}
              />
              {submission_errors?.city ? (
                <FormError
                  fieldLabel="Last Name"
                  message={submission_errors.city[0]}
                />
              ) : undefined}
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="province">Province</label>
              <select
                className="h-10 p-1 rounded"
                name="province"
                id="province"
                value={formData.province_id}
                onChange={(e) =>
                  setFormData('province_id', parseInt(e.target.value))
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
              {submission_errors?.province ? (
                <FormError
                  fieldLabel="Last Name"
                  message={submission_errors.province[0]}
                />
              ) : undefined}
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                placeholder="eg. Canada"
                value={formData.country}
                onChange={(e) => setFormData('country', e.target.value)}
              />
              {submission_errors?.country ? (
                <FormError
                  fieldLabel="Last Name"
                  message={submission_errors.country[0]}
                />
              ) : undefined}
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
        <AppDialog
          dialogDismiss={() => setResponseDialogOpen(false)}
          dialogOpen={responseDialogOpen}
          dialogType={responseDialogContent.dialogType}
          title={responseDialogContent.title}
          content={responseDialogContent.content}
        />
      </div>
    </PageWrapper>
  );
};

export default CustomerProfile;
