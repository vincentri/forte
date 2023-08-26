'use client';

import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { getMonthName, randomColor } from '@/lib/helper';

import Card from '@/app/components/molecules/Card';
import { FilterTransactionByDateResponseDto } from '@/api/transactions/dto/filterTransactionByDateResponse.dto';
import { filterTransactionByDate } from '@/api/transactions/transactions';
import { useMemo } from 'react';
import useSWR from 'swr';
import { useTransactionState } from '@/providers/transaction/state';

ChartJS.register(...registerables);

export const OneYearRecord = () => {
  const filterMenu = useTransactionState((state) => state.filterMenu);
  const { data } = useSWR(
    {
      key: '1YearRecord',
      payload: {
        ...filterMenu,
        filterBy: 'currentYear',
      },
    },
    filterTransactionByDate
  );
  const queryData: FilterTransactionByDateResponseDto[] = data?.data || [];

  const chartData = useMemo(() => {
    return {
      labels: queryData.map(
        (data) => `${getMonthName(data.month)} (${data.year})`
      ),
      datasets: [
        {
          label: 'Total',
          data: queryData.map((data) => data.total),
          backgroundColor: queryData.map((_) => randomColor()),
          borderColor: queryData.map((_) => randomColor()),
          borderWidth: 1,
        },
      ],
    };
  }, [queryData]);

  return (
    <Card>
      <h3>This Year Record</h3>
      <div className="h-[350px] py-4">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </Card>
  );
};

export default OneYearRecord;
