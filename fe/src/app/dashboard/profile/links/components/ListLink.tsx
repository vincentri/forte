import Button from '@/app/components/atoms/Button';
import Card from '@/app/components/molecules/Card';
import {
  CheckCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  DeleteUserLinkMutation,
  ListUserLinkQuery,
  SortUserLinkMutation,
  UserLinkResponse,
} from '@/__generated__/graphql';
import { DELETE_USER_LINK, SORT_USER_LINK } from '@/gql/main/userLinks';
import Image from 'next/image';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@/app/components/organism/Modal';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import SortableList, { SortableItem } from 'react-easy-sort';
import { arrayMoveImmutable } from 'array-move';

const EditLinkModal = dynamic(() => import('./EditLinkModal'));

interface IProps {
  refetch: () => void;
  data: ListUserLinkQuery;
}

export default function ListLink({ data, refetch }: IProps) {
  const [editUserLinkData, setEditUserLinkData] =
    useState<UserLinkResponse | null>(null);
  const [deleteUserLinkId, setDeleteUserLinkId] = useState<string | null>(null);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const openModalEdit = (link: UserLinkResponse) => {
    setEditUserLinkData(link);
    setShowModalEdit(true);
  };
  const hideModalEdit = () => {
    setEditUserLinkData(null);
    setShowModalEdit(false);
  };
  const openModalDelete = (id: string) => {
    setDeleteUserLinkId(id);
    setShowModalDelete(true);
  };
  const hideModalDelete = () => {
    setDeleteUserLinkId(null);
    setShowModalDelete(false);
  };
  const [deleteUserLinkQuery, { loading: loadingDeleteUserLink }] =
    useMutation<DeleteUserLinkMutation>(DELETE_USER_LINK, {
      onCompleted: () => {
        toast.success('Link deleted');
        refetch();
        hideModalDelete();
      },
      onError: (err) => toast.error(err.message),
    });

  const deleteUserLink = async () =>
    await deleteUserLinkQuery({
      variables: {
        id: deleteUserLinkId,
      },
    });

  const [sortLinkQuery] = useMutation<SortUserLinkMutation>(SORT_USER_LINK, {
    onError: (err) => toast.error(err.message),
  });

  const onFinishEdit = () => {
    refetch();
    hideModalEdit();
  };

  const [items, setItems] = useState<UserLinkResponse[]>([]);
  const onSortEnd = useCallback(
    (oldIndex: number, newIndex: number) => {
      const newItems = arrayMoveImmutable(items, oldIndex, newIndex);
      sortLinkQuery({
        variables: {
          id: newItems.map((item) => item.id),
        },
      });
      setItems(newItems);
    },
    [items, sortLinkQuery]
  );

  useEffect(() => {
    setItems(data?.listUserLink.map((v) => v));
  }, [data]);

  return (
    <div className="w-full mt-4">
      <SortableList
        onSortEnd={onSortEnd}
        className="list"
        draggedItemClassName="dragged"
      >
        {items?.map((link, index) => (
          <SortableItem key={index}>
            <div className="item">
              <Card
                key={index}
                className={`!p-0 mb-5 hover:border-purple-100 hover:border-4 transition-all ease-in-out cursor-move`}
              >
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row">
                    {link.thumbnail && (
                      <Image
                        src={link.thumbnail}
                        alt={link.title}
                        width={100}
                        height={100}
                      />
                    )}
                    <div className="p-4">
                      <div className="font-medium flex flex-row items-center">
                        {link.title}
                        <span className="ml-1">
                          {link.isActive && (
                            <CheckCircleIcon className="w-4 h-4 fill-green-400" />
                          )}
                          {!link.isActive && (
                            <XCircleIcon className="w-4 h-4 fill-red-400" />
                          )}
                        </span>
                      </div>
                      <div className="text-sm mt-1">{link.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center px-3 gap-2 cursor-pointer">
                    <div onClick={() => openModalEdit(link)}>
                      <PencilSquareIcon className="fill-purple-400 h-5 w-5 hover:fill-purple-600 transition-all" />
                    </div>
                    <div onClick={() => openModalDelete(link.id)}>
                      <TrashIcon className="fill-red-400 h-5 w-5 hover:fill-red-600" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </SortableItem>
        ))}
      </SortableList>
      <Modal
        show={showModalDelete}
        onHide={hideModalDelete}
        closeOnClickOutside={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure you want to delete the link?</ModalHeader>
          <ModalBody>
            <ModalFooter>
              <Button
                className=" !text-red-500 !bg-transparent font-medium mr-1"
                type="button"
                disabled={loadingDeleteUserLink}
                onClick={hideModalDelete}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-500 text-sm font-medium ml-1"
                type="button"
                disabled={loadingDeleteUserLink}
                onClick={deleteUserLink}
              >
                Yes, I want to delete
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
      <EditLinkModal
        data={editUserLinkData}
        showModal={showModalEdit}
        hideModal={hideModalEdit}
        callback={onFinishEdit}
      />
    </div>
  );
}
