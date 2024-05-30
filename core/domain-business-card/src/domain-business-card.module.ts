import { Module } from '@nestjs/common';
import { BusinessCardInformation } from './business-card-information.entity';
import { BusinessCard } from './domain-business-card.entity';

@Module({
    providers: [BusinessCard, BusinessCardInformation],
    exports: [BusinessCard, BusinessCardInformation],
})
export class DomainBusinessCardModule { }
