'use client';

import {
  UpdateUserNameMutation,
  UpdateUserNameMutationVariables,
  UserDetailResponse,
} from '@/__generated__/graphql';
import Button from '@/app/components/atoms/Button';
import Input from '@/app/components/atoms/Input';
import Divider from '@/app/components/molecules/Divider';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@/app/components/organism/Modal';
import { UPDATE_USERNAME } from '@/gql/main/user';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import useSWRMutation from 'swr/mutation';
import { revalidateTag, revalidateUrl } from '@/lib/http';

interface UpdateUsernameProps {
  username: string;
}

interface IProps {
  user: UserDetailResponse;
}

const ProfileSettingsUsername = ({ user }: IProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [tempFormData, setTempFormData] = useState<UpdateUsernameProps | null>(
    null
  );
  const { trigger } = useSWRMutation(revalidateUrl, revalidateTag);
  const hideModal = () => {
    setTempFormData(null);
    setShowModal(false);
  };
  const methods = useForm<UpdateUsernameProps>({
    resolver: yupResolver(
      yup.object().shape({
        username: yup
          .string()
          .required()
          .min(1)
          .matches(
            /^[a-zA-Z0-9-_.]+$/,
            'Username can only alphanumeric, ., - or _ without space'
          ),
      })
    ),
  });
  const { handleSubmit, reset } = methods;
  const [updateUsername, { loading }] = useMutation<UpdateUserNameMutation>(
    UPDATE_USERNAME,
    {
      onCompleted: async () => {
        toast.success('Username updated');
      },
      onError: (err) => toast.error(err.message),
    }
  );

  const onSubmit = async (data: UpdateUsernameProps) => {
    setTempFormData(data);
    setShowModal(true);
  };
  const onSendData = async () => {
    await updateUsername({
      variables: tempFormData as UpdateUserNameMutationVariables,
    });
    await trigger({
      type: 'tag',
      key: `profile-${user.username}`,
    });
    setShowModal(false);
  };
  useEffect(() => {
    reset({
      username: user.username,
    });
  }, [reset, user]);
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <div className="text-xl font-medium">Account</div>
          <Divider />
          <div className="mt-3 flex justify-between">
            <div className="text-md">
              <div>Username</div>
              <div className="text-xs mt-1">Customize your profile url.</div>
            </div>
            <div className="flex items-center">
              <Input name="username" placeholder="Username" />
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
      <Modal show={showModal} onHide={hideModal} closeOnClickOutside={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Are you sure you want to change your username?
          </ModalHeader>
          <ModalBody>
            <ModalFooter>
              <Button
                className=" !text-red-500 !bg-transparent font-medium mr-1"
                type="button"
                onClick={hideModal}
              >
                No, take me back
              </Button>
              <Button
                className="text-sm font-medium ml-1"
                type="button"
                disabled={loading}
                onClick={onSendData}
              >
                Yes, I want to change
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </FormProvider>
  );
};

export default ProfileSettingsUsername;
