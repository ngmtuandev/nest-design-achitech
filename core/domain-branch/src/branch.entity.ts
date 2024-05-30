import { GenericEntity } from '@core/domain/generic.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { BusinessCard } from './domain-business-card.entity';

@Entity({ name: 'branch' })
export class Branch extends GenericEntity {

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string;

  @Column('varchar', { name: 'japanese_name  ', nullable: true, length: 255 })
  japanese_name: number;

  @Column('varchar', { name: 'directory  ', nullable: true, length: 255 })
  directory: number;

  // @ManyToOne(() => BusinessCard, (businessCard) => businessCard.businessCardInformation)
  // @JoinColumn({ name: 'business_card_id' })
  // businessCard: BusinessCard;
}
