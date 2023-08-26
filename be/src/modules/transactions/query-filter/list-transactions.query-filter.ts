import {
  IsEnum,
  IsOptional,
} from 'class-validator';

import { $Enums } from '@prisma/client';

export class ListTransactionsQueryFilter {
  @IsOptional()
  page?: string;

  @IsOptional()
  limit?: string;

  @IsOptional()
  modelId?: string;

  @IsOptional()
  brandId?: string;

  @IsOptional()
  @IsEnum($Enums.TransactionStatus)
  status?: $Enums.TransactionStatus;
}
