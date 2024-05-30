import { GenericEntity } from '@core/domain/generic.entity';

import { Column, Entity } from 'typeorm';

@Entity({ name: 'speaker' })
export class SpeakerEntity extends GenericEntity {
  @Column('text', { name: 'diarization', nullable: true })
  diarization: string;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string;

  // @ManyToOne(() => AudioEntity, (audio) => audio.id)
  @Column('integer', { name: 'audio_id', nullable: true })
  audio_id: number;
}
