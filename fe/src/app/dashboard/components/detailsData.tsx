'use client';

import {
  FilterAllTransactionDataResponseDto,
  FilterAllTransactionPaginationResponseDto,
} from '@/api/transactions/dto/filterAllTransactionResponse.dto';
import { useEffect, useState } from 'react';

import Button from '@/app/components/atoms/Button';
import Card from '@/app/components/molecules/Card';
import { listAllTransactions } from '@/api/transactions/transactions';
import useSWR from 'swr';
import { useTransactionState } from '@/providers/transaction/state';

export const DetailsData = () => {
  const [page, setPage] = useState<number>(1);
  const prevPage = () => setPage(page - 1);
  const nextPage = () => setPage(page + 1);
  const filterMenu = useTransactionState((state) => state.filterMenu);
  const { data } = useSWR(
    {
      key: 'tableData',
      payload: {
        ...filterMenu,
        limit: 10,
        page,
      },
    },
    listAllTransactions
  );

  const queryData: FilterAllTransactionDataResponseDto[] = data?.data || [];
  const paginationData: FilterAllTransactionPaginationResponseDto =
    data?.pagination || {};

  useEffect(() => {
    setPage(1);
  }, [filterMenu]);

  return (
    <Card>
      <h3 className="font-bold mb-3 flex justify-between">
        <div>List of all transactions </div>
        <div>Total: {paginationData?.total}</div>
      </h3>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Transaction Number
              </th>
              <th scope="col" className="px-6 py-3">
                Brand
              </th>
              <th scope="col" className="px-6 py-3">
                Model
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {queryData.map((data, index) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={index}
              >
                <th>
                  {paginationData?.page === 1
                    ? index + 1
                    : paginationData?.limit * (paginationData?.page - 1) +
                      index +
                      1}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {data.transactionNumber}
                </th>
                <td className="px-6 py-4">{data.brand}</td>
                <td className="px-6 py-4">{data.model}</td>
                <td className="px-6 py-4">{data.status}</td>
                <td className="px-6 py-4">
                  {new Date(data.createdAt).toLocaleDateString('en-us', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-3 flex justify-between gap-3">
          <Button disabled={!paginationData.hasPrev} onClick={prevPage}>
            Previous
          </Button>
          <Button disabled={!paginationData.hasNext} onClick={nextPage}>
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DetailsData;
