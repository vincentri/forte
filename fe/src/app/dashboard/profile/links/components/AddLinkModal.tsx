import {
  CreateUserLinkMutation,
  CreateUserLinkMutationVariables,
} from '@/__generated__/graphql';
import Button from '@/app/components/atoms/Button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@/app/components/organism/Modal';
import { CREATE_USER_LINK } from '@/gql/main/userLinks';
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
}

interface CreateNewLinkProps {
  title: string;
  description: string | undefined;
  url: string;
  thumbnail: string | undefined;
  isCollectViewerInfo: boolean | undefined;
  isActive: boolean | undefined;
}

export default function AddLinkModal({
  showModal,
  hideModal,
  callback,
}: IProps) {
  const methods = useForm<CreateNewLinkProps>({
    resolver: yupResolver(
      yup.object().shape({
        title: yup.string().required(),
        description: yup.string().optional(),
        url: yup.string().url().required(),
        thumbnail: yup.string().optional(),
        isCollectViewerInfo: yup.bool().optional(),
        isActive: yup.bool().optional(),
      })
    ),
    defaultValues: {
      isActive: false,
      isCollectViewerInfo: false,
    },
  });
  const { handleSubmit, reset } = methods;
  const [createNewLink, { loading }] = useMutation<CreateUserLinkMutation>(
    CREATE_USER_LINK,
    {
      onCompleted: async () => {
        toast.success('New link created');
        callback();
      },
      onError: (err) => toast.error(err.message),
    }
  );

  const onSubmit = async (data: CreateNewLinkProps) => {
    await createNewLink({
      variables: {
        input: data,
      } as CreateUserLinkMutationVariables,
    });
  };

  useEffect(() => {
    reset();
  }, [showModal, reset]);

  return (
    <Modal
      show={showModal}
      onHide={hideModal}
      closeOnClickOutside={false}
      size={'md'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new link</ModalHeader>
        <ModalBody>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <LinkForm />
              <div className="mt-3">
                <Button type="submit" disabled={loading}>
                  Create
                </Button>
              </div>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
