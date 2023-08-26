'use client';
import { useQuery } from '@apollo/client';
import ProfileSettings from './components/ProfileSettings';
import ProfileUpdate from './components/ProfileUpdate';
import { USER_DETAIL } from '@/gql/main/user';
import { UserDetailQuery } from '@/__generated__/graphql';
import { EyeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function Page() {
  const { data } = useQuery<UserDetailQuery>(USER_DETAIL);
  return (
    <div>
      <div className="flex justify-end">
        <Link href={`/l/${data?.userDetail?.username}`} target="_blank">
          <div className="border border-gray-100 text-purple-300 rounded-lg shadow-lg px-7 py-3 cursor-pointer hover:bg-purple-300 hover:text-white transition-colors">
            <EyeIcon className="h-6 w-6 " />
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-12 md:grid-cols-3 gap-8 mt-3">
        <div className="col-span-12 lg:col-auto">
          {data?.userDetail && <ProfileUpdate user={data.userDetail} />}
        </div>
        <div className="col-span-12 lg:col-span-2">
          {data?.userDetail && <ProfileSettings user={data.userDetail} />}
        </div>
      </div>
    </div>
  );
}
