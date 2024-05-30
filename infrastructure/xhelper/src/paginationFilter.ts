import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export abstract class PaginationFilter {
  @Expose({ name: 'page' })
  @IsNumber()
  page: number;

  @Expose({ name: 'limit' })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @Expose({ name: 'sort' })
  @IsString()
  @IsOptional()
  sort?: string;

  @Expose({ name: 'sort_by' })
  @IsOptional()
  sortBy?: string;
}
