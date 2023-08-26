import { LoginRequestDto } from './dto/loginRequest.dto';
import axiosInstance from '@/lib/axios';

export const login = (_: string, { arg }: { arg: LoginRequestDto }) =>
  axiosInstance.post(`/auth/login`, arg).then((res) => res);

export const userDetails = () =>
  axiosInstance.get(`/users/detail`).then((r) => r);
