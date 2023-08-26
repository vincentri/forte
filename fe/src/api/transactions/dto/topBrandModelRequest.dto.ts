export interface TopBrandModelRequestDto {
  limit: number;

  groupBy: string;

  modelId: number;

  brandId: number;
  
  status: string;
}
