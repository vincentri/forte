'use client';

import { UserDetailResponse } from '@/__generated__/graphql';
import Card from '@/app/components/molecules/Card';
import ProfileSettingsUsername from './ProfileSettingsUsername';
import ProfileSettingsVisibility from './ProfileSettingsVisibility';

interface IProps {
  user: UserDetailResponse;
}

const ProfileSettings = ({ user }: IProps) => {
  return (
    <Card className="flex flex-col justify-center items-center py-12">
      <div className="w-full mb-5">
        <ProfileSettingsUsername user={user} />
      </div>
      <div className="w-full">
        <ProfileSettingsVisibility user={user} />
      </div>
    </Card>
  );
};

export default ProfileSettings;
