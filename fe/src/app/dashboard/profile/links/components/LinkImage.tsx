'use client';

import {
  UploadSingleFileMutation,
  UserDetailQuery,
} from '@/__generated__/graphql';
import Button from '@/app/components/atoms/Button';
import { ImageCropper } from '@/app/components/helper/ImageCropper';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@/app/components/organism/Modal';
import { UPLOAD_SINGLE_FILE } from '@/gql/main/common';
import { USER_DETAIL } from '@/gql/main/user';
import { blobToFile } from '@/lib/helper';
import { useMutation, useQuery } from '@apollo/client';
import { XCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

interface IProps {
  image?: string | undefined;
  onFinishUpload: (url: string) => void;
}

const LinkImage = ({ image, onFinishUpload }: IProps) => {
  const uploadImageRef = useRef<HTMLInputElement>(null);
  const [cropImage, setCropImage] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const hideModal = () => setShowModal(false);
  const onClickProfileImage = () => uploadImageRef.current?.click();
  const { data: user } = useQuery<UserDetailQuery>(USER_DETAIL);

  const [uploadFile] = useMutation<UploadSingleFileMutation>(
    UPLOAD_SINGLE_FILE,
    {
      onCompleted: async ({ uploadSingleFile }) => {
        onFinishUpload(uploadSingleFile.url);
        setShowModal(false);
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
        path: `profile/${user?.userDetail?.id}/link`,
      },
    });
  };
  return (
    <div className="flex justify-between">
      <div>
        <div className="flex">
          <Button className="!py-1" onClick={onClickProfileImage}>
            Choose file
          </Button>
        </div>
        <input
          className="hidden"
          type="file"
          id="profile-image"
          onChange={onUploadImage}
          ref={uploadImageRef}
        />
      </div>
      <div className="relative">
        {image && (
          <div className="relative">
            <div
              className="absolute -right-2 -top-2"
              onClick={() => onFinishUpload("")}
            >
              <XCircleIcon className=" h-5 w-5 cursor-pointer" />
            </div>
            <Image
              width={150}
              height={100}
              src={image as string}
              alt="Profile image"
            />
          </div>
        )}

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
    </div>
  );
};

export default LinkImage;
