'use client';

import { UserDetailResponse } from '@/__generated__/graphql';
import Card from '@/app/components/molecules/Card';
import ProfileUpdateImage from './ProfileUpdateImage';
import ProfileUpdateBio from './ProfileUpdateBio';

interface IProps {
  user: UserDetailResponse;
}

const ProfileUpdate = ({ user }: IProps) => {
  return (
    <Card className="flex flex-col justify-center items-center py-12">
      <div className="mb-3">
        <ProfileUpdateImage user={user} />
      </div>
      <ProfileUpdateBio user={user} />
    </Card>
  );
};

export default ProfileUpdate;
