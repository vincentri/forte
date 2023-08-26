'use client';

import { ListUserLinkQuery } from '@/__generated__/graphql';
import { LIST_USER_LINK } from '@/gql/main/userLinks';
import { useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';
const AddLinkAction = dynamic(() => import('./components/AddLinkAction'));
const ListLink = dynamic(() => import('./components/ListLink'));

export default function Page() {
  const { data, refetch } = useQuery<ListUserLinkQuery>(LIST_USER_LINK);
  return (
    <div className="flex flex-col">
      <AddLinkAction refetch={refetch} data={data} />
      {data && <ListLink data={data} refetch={refetch} />}
    </div>
  );
}
