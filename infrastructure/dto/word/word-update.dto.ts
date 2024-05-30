import { Expose } from 'class-transformer';
import { WORD_TYPE } from '@infrastructure/xhelper';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class WordUpdateDTO {
  @IsOptional()
  idWord: number;

  @Expose({ name: 'name' })
  @IsString()
  @IsOptional()
  name: string;

  @Expose({ name: 'type' })
  @IsEnum(WORD_TYPE)
  @IsOptional()
  type: WORD_TYPE;

  @Expose({ name: 'description' })
  @IsString()
  @IsOptional()
  description: string;

  @Expose({ name: 'active' })
  @IsOptional()
  @IsEnum(['1', '0'])
  active: number;
}
