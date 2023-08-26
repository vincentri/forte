import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

import { $Enums } from '@prisma/client';
import { FilterByDateTransactionsQueryFilterEnum } from '../enum/filter-date-transactions.enum';

export class FilterByTransactionsQueryFilter {
  @IsOptional()
  modelId?: string;

  @IsOptional()
  brandId?: string;

  @IsOptional()
  @IsEnum($Enums.TransactionStatus)
  status?: $Enums.TransactionStatus;

  @IsNotEmpty()
  @IsEnum(FilterByDateTransactionsQueryFilterEnum)
  filterBy?: FilterByDateTransactionsQueryFilterEnum;
}
