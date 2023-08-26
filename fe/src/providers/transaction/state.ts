'use client';

import { StateCreator, create } from 'zustand';

export interface FilterMenuProps {
  brandId?: string | null;
  status?: string | null;
}

export interface TransactionSlice {
  filterMenu: FilterMenuProps;
  setFilterMenu: (value: FilterMenuProps) => void;
}

const createTransactionSlice: StateCreator<TransactionSlice> = (set, get) => ({
  filterMenu: {
    brandId: null,
    status: null,
  },
  setFilterMenu: (value: FilterMenuProps): void => {
    set({
      filterMenu: value,
    });
  },
});

export const useTransactionState = create(createTransactionSlice);
