import axiosInstance from '@/lib/axios';

export const listBrands = () =>
  axiosInstance.get(`/brands`).then((r) => r);
