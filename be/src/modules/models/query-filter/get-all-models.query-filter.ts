import { IsNumber, IsOptional } from 'class-validator';

export class GetAllModelsQueryFilter {
  @IsOptional()
  brandId?: string;
}
