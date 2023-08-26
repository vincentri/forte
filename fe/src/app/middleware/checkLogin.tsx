'use client';

import { AUTH_TOKEN } from '@/providers/auth/constant';
import { getCookie } from 'cookies-next';
import { useAuthState } from '@/providers/auth/state';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function CheckLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  const route = useRouter();
  const authToken = getCookie(AUTH_TOKEN);
  const setIsloggedIn = useAuthState((state) => state.setIsloggedIn);
  useEffect(() => {
    if (!authToken) setIsloggedIn(false);
    if (authToken) {
      setIsloggedIn(true);
      route.push('/dashboard');
    }
  }, []);
  return children;
}
