'use client';

import {
  UpdateUserProfileMutation,
  UpdateUserProfileMutationVariables,
  UserDetailResponse,
} from '@/__generated__/graphql';
import Button from '@/app/components/atoms/Button';
import Input from '@/app/components/atoms/Input';
import Textarea from '@/app/components/atoms/Textarea';
import { UPDATE_USER_PROFILE } from '@/gql/main/user';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import ReactHtmlParser from 'react-html-parser';
import useSWRMutation from 'swr/mutation';
import { revalidateTag, revalidateUrl } from '@/lib/http';

interface UpdateUserProfileProps {
  name: string;
  bio: string;
}

interface IProps {
  user: UserDetailResponse;
}

const ProfileUpdateBio = ({ user }: IProps) => {
  const { trigger } = useSWRMutation(revalidateUrl, revalidateTag);
  const [editMode, setEditMode] = useState<boolean>(false);
  const enableEditMode = () => setEditMode(true);
  const disableEditMode = () => setEditMode(false);
  const methods = useForm<UpdateUserProfileProps>({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required().min(1),
        bio: yup.string().required().min(1).max(250),
      })
    ),
  });
  const { handleSubmit, reset } = methods;
  const [updateUserProfile, { loading }] =
    useMutation<UpdateUserProfileMutation>(UPDATE_USER_PROFILE, {
      onCompleted: async () => {
        toast.success('User profile updated');
        disableEditMode();
        await trigger({
          type: 'tag',
          key: `profile-${user.username}`,
        });
      },
      onError: (err) => toast.error(err.message),
    });

  const onSubmit = async ({ bio, name }: UpdateUserProfileProps) => {
    await updateUserProfile({
      variables: {
        input: {
          name,
          bio,
        },
      } as UpdateUserProfileMutationVariables,
    });
  };

  const userBio = useMemo(() => {
    return user.bio.replaceAll('\n', '<br/>');
  }, [user.bio]);

  useEffect(() => {
    reset({
      name: user.name,
      bio: user.bio,
    });
  }, [reset, user]);
  return (
    <div className="w-full">
      {!editMode && (
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-medium text-2xl">{user.name}</h1>
          <h1 className="mt-6 text-justify text-sm">
            {ReactHtmlParser(userBio)}
          </h1>
          <div className="mt-3 w-full">
            <Button className="w-full" onClick={enableEditMode}>
              Edit
            </Button>
          </div>
        </div>
      )}
      {editMode && (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="mb-3">
              <Input name="name" placeholder="Name" />
            </div>
            <div className="mb-3">
              <Textarea name="bio" placeholder="Bio" rows={10} />
            </div>
            <div className="flex gap-2">
              <Button
                className="bg-red-400 text-sm"
                disabled={loading}
                onClick={disableEditMode}
              >
                Cancel
              </Button>
              <Button type="submit" className="text-sm" disabled={loading}>
                Save Changes
              </Button>
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default ProfileUpdateBio;
