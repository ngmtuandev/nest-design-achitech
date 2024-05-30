import { GenericEntity } from '@core/domain/generic.entity';

import { Column, Entity } from 'typeorm';

@Entity({ name: 'match' })
export class MatchEntity extends GenericEntity {
  @Column('integer', { name: 'audio_id', nullable: true })
  audio_id: number;

  @Column('tinyint', { name: 'word_type', nullable: true })
  word_type: string;

  // @ManyToOne(() => AudioEntity, (audio) => audio.id)
  @Column('text', { name: 'words', nullable: true })
  words: string;
}
