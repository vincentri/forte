'use client';

import { StateCreator, create } from 'zustand';
import { deleteCookie, setCookie } from 'cookies-next';

import { AUTH_TOKEN } from './constant';

export interface AuthSlice {
  isLoggedIn: boolean | null;
  logOut: () => void;
  setIsloggedIn: (isLoggedIn: boolean) => void;
  setLoginToken: (authToken: any) => void;
}

const createAuthSlice: StateCreator<AuthSlice> = (set, get) => ({
  isLoggedIn: null,
  setIsloggedIn: (isLoggedIn: boolean): void => {
    set({ isLoggedIn });
  },
  setLoginToken: (authToken: string): void => {
    setCookie(AUTH_TOKEN, authToken, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      path: '/',
    });
    get().setIsloggedIn(true);
  },
  logOut: (): void => {
    deleteCookie(AUTH_TOKEN, { path: '/' });
    get().setIsloggedIn(false);
  },
});

export const useAuthState = create(createAuthSlice);
