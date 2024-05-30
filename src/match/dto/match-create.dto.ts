import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class SpeakerCreateDto {
  @Expose({ name: 'audio_id' })
  audio_id: number;

  @IsOptional()
  @Expose({ name: 'word_type' })
  word_type: string;

  @IsOptional()
  @Expose({ name: 'words' })
  words: string;
}
