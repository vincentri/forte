import {
  CreateUserLinkMutation,
  CreateUserLinkMutationVariables,
  UpdateUserLinkMutation,
  UpdateUserLinkMutationVariables,
  UserLinkResponse,
} from '@/__generated__/graphql';
import Button from '@/app/components/atoms/Button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@/app/components/organism/Modal';
import { CREATE_USER_LINK, UPDATE_USER_LINK } from '@/gql/main/userLinks';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import LinkForm from './LinkForm';

interface IProps {
  showModal: boolean;
  hideModal: () => void;
  callback: () => void;
  data: UserLinkResponse | null;
}

interface EditLinkProps {
  id: string;
  title: string;
  description: string | undefined;
  url: string;
  thumbnail: string | undefined;
  isCollectViewerInfo: boolean | undefined;
  isActive: boolean | undefined;
}

export default function EditLinkModal({
  showModal,
  hideModal,
  callback,
  data,
}: IProps) {
  const methods = useForm<EditLinkProps>({
    resolver: yupResolver(
      yup.object().shape({
        id: yup.string().required(),
        title: yup.string().required(),
        description: yup.string().optional(),
        url: yup.string().url().required(),
        thumbnail: yup.string().optional(),
        isCollectViewerInfo: yup.bool().optional(),
        isActive: yup.bool().optional(),
      })
    ),
  });
  const { handleSubmit, reset } = methods;
  const [updteLink, { loading }] = useMutation<UpdateUserLinkMutation>(
    UPDATE_USER_LINK,
    {
      onCompleted: async () => {
        toast.success(`Link updated`);
        callback();
      },
      onError: (err) => toast.error(err.message),
    }
  );

  const onSubmit = async (data: EditLinkProps) => {
    await updteLink({
      variables: {
        input: data,
      } as UpdateUserLinkMutationVariables,
    });
  };

  useEffect(() => {
    reset({
      id: data?.id,
      title: data?.title,
      description: data?.description,
      thumbnail: data?.thumbnail,
      url: data?.url,
      isActive: data?.isActive,
      isCollectViewerInfo: data?.isCollectViewerInfo,
    });
  }, [data, reset]);

  return (
    <Modal
      show={showModal}
      onHide={hideModal}
      closeOnClickOutside={false}
      size={'md'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit link {data?.title}</ModalHeader>
        <ModalBody>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <LinkForm />
              <div className="mt-3">
                <Button type="submit" disabled={loading}>
                  Update
                </Button>
              </div>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
