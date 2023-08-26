import { IsEnum, IsOptional } from 'class-validator';

import { $Enums } from '@prisma/client';
import { TopBrandTransactionsQueryFilterEnum } from '../enum/top-brand-transactions.enum';

export class TopBrandTransactionsQueryFilter {
  @IsOptional()
  limit?: string;

  @IsOptional()
  modelId?: string;

  @IsOptional()
  brandId?: string;

  @IsOptional()
  @IsEnum($Enums.TransactionStatus)
  status?: $Enums.TransactionStatus;

  @IsOptional()
  @IsEnum(TopBrandTransactionsQueryFilterEnum)
  groupBy?: TopBrandTransactionsQueryFilterEnum;
}
