import { Expose } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class MetaPaginationDto {
  @Expose({ name: 'page_current' })
  @IsNumber()
  @IsOptional()
  pageCurrent: number;

  @Expose({ name: 'total_page' })
  @IsNumber()
  totalPage: number;
}
