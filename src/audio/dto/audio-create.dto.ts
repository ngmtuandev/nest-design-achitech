import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class AudioCreateDto {
  @IsOptional()
  @Expose({ name: 'session_id' })
  session_id: string;

  @IsOptional()
  @Expose({ name: 'name' })
  name: string | '';

  @IsOptional()
  @Expose({ name: 'day' })
  day: number;

  @IsOptional()
  @Expose({ name: 'month' })
  month: number;

  @IsOptional()
  @Expose({ name: 'year' })
  year: number;

  //   branch_id: number;

  @IsOptional()
  @Expose({ name: 'call_id' })
  call_id: string;

  @IsOptional()
  @Expose({ name: 'ext_number' })
  ext_number: string;

  @IsOptional()
  @Expose({ name: 'outcoming_number' })
  outcoming_number: string;

  @IsOptional()
  @Expose({ name: 'ext_number_original' })
  ext_number_original: string;

  @IsOptional()
  @Expose({ name: 'outcoming_number_original' })
  outcoming_number_original: string;

  @IsOptional()
  @Expose({ name: 'file_name_original' })
  file_name_original: string;

  @IsOptional()
  @Expose({ name: 'file_created_at' })
  file_created_at: Date;

  @IsOptional()
  @Expose({ name: 'content' })
  content: string;

  @IsOptional()
  @Expose({ name: 'status' })
  status: number;
  // @ManyToOne(() => BusinessCard, (businessCard) => businessCard.businessCardInformation)
  // @JoinColumn({ name: 'business_card_id' })
  // businessCard: BusinessCard;
}
