import * as yup from 'yup';

import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/app/components/atoms/Button';
import { ListBrandsResponseDto } from '@/api/brands/dto/listBrandsResponse.dto';
import Text from '@/app/components/atoms/Text';
import { listBrands } from '@/api/brands/brands';
import useSWR from 'swr';
import { useTransactionState } from '@/providers/transaction/state';
import { yupResolver } from '@hookform/resolvers/yup';

interface FilterMenuProps {
  brandId: string | undefined;
  status: string | undefined;
}

export const FilterMenu = () => {
  const setFilterMenu = useTransactionState((state) => state.setFilterMenu);
  const methods = useForm<FilterMenuProps>({
    resolver: yupResolver(
      yup.object().shape({
        brandId: yup.string().optional(),
        status: yup.string().optional(),
      })
    ),
  });
  const { handleSubmit, register } = methods;
  const onSubmit = async ({ brandId, status }: FilterMenuProps) => {
    setFilterMenu({
      brandId: brandId || null,
      status: status || null,
    });
  };

  const { data } = useSWR('listBrands', listBrands);
  const brands: ListBrandsResponseDto[] = data?.data?.data || [];
  const status = ['New', 'InProcess', 'Completed'];
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="mb-3">
            <Text className="!text-sm mb-3 font-semibold">Brands</Text>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register('brandId')}
            >
              <option key="select" value={''}>
                --Select One--
              </option>
              {brands.map((brand, key) => (
                <option key={key} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <Text className="!text-sm mb-3 font-semibold">Status</Text>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register('status')}
            >
              <option key="select" value="">
                --Select One--
              </option>
              {status.map((stat, key) => (
                <option key={key}>{stat}</option>
              ))}
            </select>
          </div>
          <div>
            <Button type="submit">Apply</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default FilterMenu;
