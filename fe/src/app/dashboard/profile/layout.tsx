'use client';

import Divider from '@/app/components/molecules/Divider';
import Tab from '@/app/components/organism/Tab';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='mt-2'>
      <Tab
        contents={[
          {
            header: 'About Me',
            url: '/app/profile',
          },
          {
            header: 'Links',
            url: '/app/profile/links',
          },
        ]}
      />
      <div className='py-4'>{children}</div>
    </div>
  );
}
