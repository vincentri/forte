import Button from '@/app/components/atoms/Button';
import Card from '@/app/components/molecules/Card';
import Tooltip from '@/app/components/molecules/Tooltip';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import AddLinkModal from './AddLinkModal';
import { useMemo, useState } from 'react';
import { ListUserLinkQuery } from '@/__generated__/graphql';

interface IProps {
  refetch: () => void;
  data: ListUserLinkQuery | undefined;
}

export default function AddLinkAction({ refetch, data }: IProps) {
  const [showModalSort, setShowModalSort] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = () => setShowModal(true);
  const hideModal = () => setShowModal(false);
  const openModalSort = () => setShowModalSort(true);
  const hideModalSort = () => setShowModalSort(false);
  const onFinishAdd = () => {
    hideModal();
    refetch();
  };
  const onFinishSort = () => {
    hideModalSort();
    refetch();
  };

  const isDisableAdd = useMemo(() => {
    return data?.listUserLink && data?.listUserLink.length >= 10;
  }, [data]);
  return (
    <Card className="w-full !bg-purple-400 ">
      <div className="flex items-center flex-col md:flex-row md:justify-between text-white">
        <div className="md:w-2/3">
          <div className="flex items-center flex-row">
            <div className="font-medium text-lg mr-1">Add a Link</div>
            <Tooltip label="You can add a link to your profile to <br/> share anything and redirect them there">
              <InformationCircleIcon className="h-5 w-5" />
            </Tooltip>
          </div>
          <div className="text-xs mt-2">
            Your Link in bio tool. Add a link to anything. Ideal for external
            webpages, referrals, or anything that you want to show off or
            promote.
          </div>
        </div>
        <div className="flex gap-2 w-full justify-end">
          <div className="mt-3 w-full md:mt-0 md:w-auto">
            <Tooltip
              label={
                isDisableAdd
                  ? 'Maximum link is 10. <br/> You can contact us if you need more than 10 links'
                  : ''
              }
            >
              <Button
                className="border-2 hover:bg-white hover:text-purple-400 hover:border-white disabled:text-purple-300"
                disabled={isDisableAdd}
                onClick={openModal}
              >
                Add Link
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
      <AddLinkModal
        showModal={showModal}
        hideModal={hideModal}
        callback={onFinishAdd}
      />
    </Card>
  );
}
