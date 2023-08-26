'use client';

import { Chart as ChartJS, registerables } from 'chart.js';

import Card from '@/app/components/molecules/Card';
import { Pie } from 'react-chartjs-2';
import { TopBrandModelResponseDto } from '@/api/transactions/dto/topBrandModelResponse.dto';
import { randomColor } from '@/lib/helper';
import { topBrandTransactions } from '@/api/transactions/transactions';
import { useMemo } from 'react';
import useSWR from 'swr';
import { useTransactionState } from '@/providers/transaction/state';

ChartJS.register(...registerables);

export const TopBrand = () => {
  const filterMenu = useTransactionState((state) => state.filterMenu);
  const { data } = useSWR(
    { key: 'topBrands', payload: filterMenu },
    topBrandTransactions
  );
  const topBrands: TopBrandModelResponseDto[] = data?.data || [];

  const chartData = useMemo(() => {
    return {
      labels: topBrands.map((v) => v.name),
      datasets: [
        {
          label: 'Total',
          data: topBrands.map((v) => v.total),
          backgroundColor: topBrands.map((_) => randomColor()),
          hoverOffset: 4,
        },
      ],
    };
  }, [topBrands]);

  return (
    <Card>
      <h3>Top Brands by transaction</h3>
      <div className="h-[350px] py-4">
        <Pie data={chartData} />
      </div>
    </Card>
  );
};

export default TopBrand;
