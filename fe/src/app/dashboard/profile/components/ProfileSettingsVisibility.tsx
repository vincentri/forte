'use client';

import {
  UpdateUserProfileSettingMutation,
  UpdateUserProfileSettingMutationVariables,
  UserDetailResponse,
} from '@/__generated__/graphql';
import Button from '@/app/components/atoms/Button';
import Divider from '@/app/components/molecules/Divider';
import Switch from '@/app/components/molecules/Switch';
import { UPDATE_USER_PROFILE_SETTING } from '@/gql/main/user';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import useSWRMutation from 'swr/mutation';
import { revalidateTag, revalidateUrl } from '@/lib/http';

interface UpdateUserProfileSettingsProps {
  isPublic: boolean | undefined;
  color: string | undefined;
}

interface IProps {
  user: UserDetailResponse;
}

const ProfileSettingsVisibility = ({ user }: IProps) => {
  const { trigger } = useSWRMutation(revalidateUrl, revalidateTag);
  const methods = useForm<UpdateUserProfileSettingsProps>({
    resolver: yupResolver(
      yup.object().shape({
        isPublic: yup.bool().optional(),
        color: yup.string().optional(),
      })
    ),
  });
  const { handleSubmit, reset } = methods;
  const [updateUserProfileSettings, { loading }] =
    useMutation<UpdateUserProfileSettingMutation>(UPDATE_USER_PROFILE_SETTING, {
      onCompleted: async () => {
        toast.success('User settings updated');
        await trigger({
          type: 'tag',
          key: `profile-${user.username}`,
        });
      },
      onError: (err) => toast.error(err.message),
    });

  const onSubmit = async ({ isPublic }: UpdateUserProfileSettingsProps) => {
    await updateUserProfileSettings({
      variables: {
        input: {
          isPublic,
          color: '#E4DEFD',
        },
      } as UpdateUserProfileSettingMutationVariables,
    });
  };
  useEffect(() => {
    reset({
      isPublic: user.isPublic,
    });
  }, [reset, user]);
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <div className="text-xl font-medium">Visibility</div>
          <Divider />
          <div className="mt-3 flex justify-between">
            <div className="text-md">
              <div>Is public profile?</div>
              <div className="text-xs mt-1">
                Your profile page will be access publicly by everyone
              </div>
            </div>
            <div>
              <Switch name="isPublic" />
            </div>
          </div>
        </div>
        <div className="text-right">
          <Button
            type="submit"
            disabled={loading}
            className="font-medium lg:w-1/2 xl:w-1/3"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProfileSettingsVisibility;
