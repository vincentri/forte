import { FilterAllTransactionRequestDto } from './dto/filterAllTransactionRequest.dto';
import { FilterTransactionByDateRequestDto } from './dto/filterTransactionByDateRequest.dto';
import { TopBrandModelRequestDto } from './dto/topBrandModelRequest.dto';
import axiosInstance from '@/lib/axios';

export const topBrandTransactions = async (params: {
  key: string;
  payload: TopBrandModelRequestDto;
}) => {
  const { payload } = params;
  return axiosInstance
    .get(`/transactions/top-brand-model`, { params: payload })
    .then((r) => r.data)
    .catch((err) => console.log(err));
};

export const filterTransactionByDate = async (params: {
  key: string;
  payload: FilterTransactionByDateRequestDto;
}) => {
  const { payload } = params;
  return axiosInstance
    .get(`/transactions/filter-by-date`, { params: payload })
    .then((r) => r.data)
    .catch((err) => console.log(err));
};

export const listAllTransactions = async (params: {
  key: string;
  payload: FilterAllTransactionRequestDto;
}) => {
  const { payload } = params;
  return axiosInstance
    .get(`/transactions`, { params: payload })
    .then((r) => r.data)
    .catch((err) => console.log(err));
};
