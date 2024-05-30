import { Expose } from 'class-transformer';
import { WORD_TYPE } from '@infrastructure/xhelper';
import {
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class WordCreateDTO {
  @Expose({ name: 'name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose({ name: 'type' })
  @IsEnum(WORD_TYPE)
  @IsNotEmpty()
  type: WORD_TYPE;

  @Expose({ name: 'description' })
  @IsString()
  @IsOptional()
  description: string;

  @Expose({ name: 'active' })
  @IsNumber()
  @IsNotEmpty()
  active: number;
}
