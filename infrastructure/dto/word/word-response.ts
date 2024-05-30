import { ResponseDto } from '@infrastructure/message';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class WordDto {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  id: number;
  @Expose({ name: 'name' })
  @IsNotEmpty()
  name: string | null = '';

  katakanaName: string | null = '';

  @Expose({ name: 'description' })
  @IsNotEmpty()
  description: string | null = '';

  @Expose({ name: 'active' })
  @IsNotEmpty()
  active: number | null = 1;

  createdBy: string | null = '';
  @Expose({ name: 'createdAt' })
  @IsNotEmpty()
  createdAt!: Date;
}
