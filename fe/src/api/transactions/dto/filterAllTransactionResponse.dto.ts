export interface FilterAllTransactionResponseDto {
  pagination: FilterAllTransactionPaginationResponseDto;

  data: FilterAllTransactionDataResponseDto[];
}

export interface FilterAllTransactionDataResponseDto {
  transactionNumber: string;

  createdAt: Date;

  model: string;

  brand: string;

  status: string;
}

export interface FilterAllTransactionPaginationResponseDto {
  total: number;

  page: number;

  limit: number;

  hasPrev: boolean;

  hasNext: boolean;
}
