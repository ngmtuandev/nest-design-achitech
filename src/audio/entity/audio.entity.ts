import { GenericEntity } from '@core/domain/generic.entity';
import { SpeakerEntity } from 'src/speech/entity/speaker.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { BusinessCard } from './domain-business-card.entity';

@Entity({ name: 'audio' })
export class AudioEntity extends GenericEntity {
  @Column('varchar', { name: 'session_id', nullable: true, length: 255 })
  session_id: string;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string;

  @Column('integer', { name: 'day', nullable: true })
  day: number;

  @Column('integer', { name: 'month', nullable: true })
  month: number;

  @Column('integer', { name: 'year', nullable: true })
  year: number;

  @Column('varchar', { name: 'call_id', nullable: true, length: 255 })
  call_id: string;

  @Column('varchar', { name: 'ext_number', nullable: true, length: 255 })
  ext_number: string;

  @Column('varchar', { name: 'outcoming_number', nullable: true, length: 255 })
  outcoming_number: string;

  @Column('varchar', {
    name: 'ext_number_original',
    nullable: true,
    length: 255,
  })
  ext_number_original: string;

  @Column('varchar', {
    name: 'outcoming_number_original',
    nullable: true,
    length: 255,
  })
  outcoming_number_original: string;

  @Column('varchar', {
    name: 'file_name_original',
    nullable: true,
    length: 255,
  })
  file_name_original: string;

  @Column('datetime', {
    name: 'file_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  file_created_at: Date;

  @Column('text', { name: 'content', nullable: true })
  content: string;

  @Column('tinyint', { name: 'status', nullable: true })
  status: number;
  
  // @ManyToOne(() => BusinessCard, (businessCard) => businessCard.businessCardInformation)
  // @JoinColumn({ name: 'business_card_id' })
  // businessCard: BusinessCard;
}
