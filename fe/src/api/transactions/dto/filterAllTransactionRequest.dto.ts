export interface FilterAllTransactionRequestDto {
  limit: number;

  page: number;

  brandId: number;

  modelId: number;

  status: string;
}
