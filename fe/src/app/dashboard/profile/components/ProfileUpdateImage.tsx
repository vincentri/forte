'use client';

import {
  UpdateUserImageMutation,
  UpdateUserImageMutationVariables,
  UploadSingleFileMutation,
  UserDetailResponse,
} from '@/__generated__/graphql';
import { ImageCropper } from '@/app/components/helper/ImageCropper';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@/app/components/organism/Modal';
import { UPLOAD_SINGLE_FILE } from '@/gql/main/common';
import { UPDATE_USER_IMAGE } from '@/gql/main/user';
import { blobToFile } from '@/lib/helper';
import { revalidateTag, revalidateUrl } from '@/lib/http';
import { useMutation } from '@apollo/client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import useSWRMutation from 'swr/mutation';

interface IProps {
  user: UserDetailResponse;
}

const ProfileUpdateImage = ({ user }: IProps) => {
  const { trigger } = useSWRMutation(revalidateUrl, revalidateTag);
  const uploadImageRef = useRef<HTMLInputElement>(null);
  const [cropImage, setCropImage] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const hideModal = () => setShowModal(false);
  const onClickProfileImage = () => uploadImageRef.current?.click();
  const [updateimage] = useMutation<UpdateUserImageMutation>(
    UPDATE_USER_IMAGE,
    {
      onCompleted: async () => {
        await trigger({
          type: 'tag',
          key: `profile-${user.username}`,
        });
        toast.success('Profile picture updated');
        hideModal();
      },
      onError: (err) => toast.error(err.message),
    }
  );
  const [uploadFile, { loading }] = useMutation<UploadSingleFileMutation>(
    UPLOAD_SINGLE_FILE,
    {
      onCompleted: async ({ uploadSingleFile }) => {
        await updateimage({
          variables: {
            url: uploadSingleFile.url,
          } as UpdateUserImageMutationVariables,
        });
      },
      onError: (err) => toast.error(err.message),
    }
  );
  const onUploadImage = (e: any) => {
    const file = e.target.files[0];
    const fileInput = document.getElementById('profile-image') as any;
    fileInput.value = '';
    if (
      ![
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/svg+xml',
        'image/gif',
      ].includes(file.type)
    ) {
      toast.error('File must in image format');
      return;
    }
    if (file.size > 2000000) {
      toast.error('Max file size 2mb');
      return;
    }
    setShowModal(true);
    setCropImage(file);
  };

  const onFinishCrop = async (fileCropped: any) => {
    const file = await blobToFile(fileCropped);
    await uploadFile({
      variables: {
        file,
        path: `profile/${user.id}`,
      },
    });
  };
  return (
    <div className="relative">
      <Image
        className="rounded-full cursor-pointer"
        width={150}
        height={100}
        src={user.image as string}
        alt="Profile image"
        onClick={onClickProfileImage}
      />
      <input
        className="hidden"
        type="file"
        id="profile-image"
        onChange={onUploadImage}
        ref={uploadImageRef}
      />
      <Modal show={showModal} onHide={hideModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ImageCropper
            onFinish={onFinishCrop}
            value={cropImage}
            aspect={1 / 1}
          />
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileUpdateImage;
