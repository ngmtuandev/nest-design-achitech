import { GenericEntity } from '@core/domain/generic.entity';

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessCard } from './domain-business-card.entity';
import { BUSINESS_CARD_FIELD_TYPE } from '@infrastructure/xhelper';

@Entity({ name: 'business_card_information' })
export class BusinessCardInformation extends GenericEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    text: string;

    @Column({ type: 'enum', enum: BUSINESS_CARD_FIELD_TYPE })
    type: BUSINESS_CARD_FIELD_TYPE;

    @ManyToOne(() => BusinessCard, (businessCard) => businessCard.businessCardInformation)
    @JoinColumn({ name: 'business_card_id' })
    businessCard: BusinessCard;
}