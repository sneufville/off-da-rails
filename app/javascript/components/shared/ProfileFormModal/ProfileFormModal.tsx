/**
 * @author  sai
 * created  2024-08-06
 * project  off_da_rails_coffee
 */
import React from 'react';
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import type {
  CommonDialogProps,
  CustomerProfile,
  Province,
} from '../../../@types/offDaRails';
import ApiUtils from '../../../utils/apiUtils';
import { usePage } from '@inertiajs/react';
import AppButton from '../AppButton/AppButton';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { BiSolidSave } from 'react-icons/bi';
import AppLoader from '../AppLoader/AppLoader';

type ProfileFormModalProps = CommonDialogProps;

const ProfileFormModal: React.FC<ProfileFormModalProps> = ({
  dialogOpen,
  dialogTitle,
  dialogConfirmAction,
  dialogContent,
  dialogCancelAction,
}) => {
  const { current_user, current_profile } = usePage().props;
  console.log('current_profile: ', current_profile);
  const [updatingProfile, setUpdatingProfile] = React.useState<boolean>(false);
  const [provinces, setProvinces] = React.useState<Province[]>([]);
  const [customerProfile, setCustomerProfile] = React.useState<CustomerProfile>(
    {
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
    }
  );

  React.useEffect(() => {
    if (current_profile) {
      setCustomerProfile(current_profile as CustomerProfile);
    }
  }, [current_profile]);

  React.useEffect(() => {
    if (dialogOpen) {
      ApiUtils.fetchProvinces().then((provinceResults) =>
        setProvinces(provinceResults)
      );
    }
  }, [dialogOpen]);

  const execUpdateProfile = React.useCallback(() => {
    const _exec = async () => {
      if (updatingProfile) return;
      const profileData = { ...customerProfile };
      if (!profileData.province_id) return;
      const token = ApiUtils.getCSRFToken();
      if (!token) return;
      const updateResult = await ApiUtils.updateProfile(token, profileData);
      if (updateResult.success) {
        toast.success('Profile updated successfully!', {
          position: 'top-center',
        });
        dialogConfirmAction();
      } else {
        toast.error('There was a problem updating your profile!', {
          position: 'top-center',
        });
      }
    };

    setUpdatingProfile(true);
    _exec().finally(() => setUpdatingProfile(false));
  }, [customerProfile, updatingProfile]);

  return (
    <Dialog open={dialogOpen} onClose={() => {}} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-md space-y-4 p-4 bg-white">
          <div className="flex items-center justify-between py-1">
            <DialogTitle className="text-xl font-bold">
              {dialogTitle}
            </DialogTitle>
            <IoCloseCircleOutline
              onClick={() => {
                if (!updatingProfile) dialogCancelAction();
              }}
              size={24}
            />
          </div>
          <Description>{dialogContent}</Description>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1">
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="provinceId">Province</label>
                <select
                  name="province_id"
                  id="provinceId"
                  className="h-10 rounded px-1"
                  onChange={(e) =>
                    setCustomerProfile((prevState) => ({
                      ...prevState,
                      province_id: parseInt(e.target.value),
                    }))
                  }
                  value={customerProfile.province_id}
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
            </div>
            <div className="w-full py-2">
              <AppButton
                disabled={updatingProfile}
                iconelement={<BiSolidSave />}
                onClick={() => execUpdateProfile()}
              >
                Save Profile
              </AppButton>
            </div>
          </form>
        </DialogPanel>
        <AppLoader
          open={updatingProfile}
          loaderContent={'Updating your profile...'}
        />
      </div>
    </Dialog>
  );
};

export default ProfileFormModal;
