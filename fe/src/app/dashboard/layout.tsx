'use client';

import FilterMenu from './components/filterMenu';
import { UserDetailResponseDto } from '@/api/auths/dto/userDetailResponse.dto';
import { toast } from 'react-toastify';
import { useAuthState } from '@/providers/auth/state';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { userDetails } from '@/api/auths/auth';

const LoadingPage = () => {
  return <>Loading</>;
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data } = useSWR('userDetail', userDetails);
  const user: UserDetailResponseDto = data?.data?.data;
  const route = useRouter();
  const isLogin = useAuthState((state) => state.isLoggedIn);
  const setLogOut = useAuthState((state) => state.logOut);

  const logOut = () => {
    setLogOut();
    route.push('/');
  };

  useEffect(() => {
    if (isLogin === false) route.push('/');
  }, [isLogin, route]);

  useEffect(() => {
    if (localStorage.getItem('showWelcome')) {
      toast.success('Welcome to dashboard', {
        position: 'top-right',
      });
      localStorage.removeItem('showWelcome');
    }
  }, []);
  return (
    <div>
      {!isLogin && <LoadingPage />}
      {isLogin && (
        <>
          <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
              <div className="flex items-center justify-end">
                <div className="flex items-center">
                  <div className="flex items-start flex-col ml-3">
                    <div className="font-bold">Welcome, {user?.name}</div>
                    <div className="cursor-pointer" onClick={logOut}>
                      Logout
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <aside
            id="logo-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r-2 border-gray-100 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Sidebar"
          >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
              <FilterMenu />
            </div>
          </aside>

          <div className="p-4 pt-20 sm:ml-64 sm:pt-16">{children}</div>
        </>
      )}
    </div>
  );
}
