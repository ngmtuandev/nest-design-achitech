import { GenericEntity } from '@core/domain/generic.entity';
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { BusinessCardInformation } from './business-card-information.entity';

@Entity({ name: 'business_card' })
export class BusinessCard extends GenericEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    imageUrl: string;

    @OneToMany(() => BusinessCardInformation, (businessCardInformation) => businessCardInformation.businessCard)
    businessCardInformation: BusinessCardInformation[];
}
