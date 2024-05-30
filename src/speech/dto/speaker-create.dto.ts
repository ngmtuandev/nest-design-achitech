import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class SpeakerCreateDto {
  @Expose({ name: 'audio_id' })
  audio_id: number;

  @IsOptional()
  @Expose({ name: 'diarization' })
  diarization: string;

  @IsOptional()
  @Expose({ name: 'description' })
  description: string;
}
