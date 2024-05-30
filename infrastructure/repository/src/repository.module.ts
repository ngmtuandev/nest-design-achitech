import { DomainBusinessCardModule } from '@core/domain-business-card';
import { Module } from '@nestjs/common';
import { BusinessCardInformationRepository } from './business-card-information.repository';
import { BusinessCardRepository } from './business-card.repository';
import { RepositoryService } from './repository.service';

@Module({
  imports: [DomainBusinessCardModule],
  providers: [RepositoryService, BusinessCardRepository, BusinessCardInformationRepository],
  exports: [RepositoryService, BusinessCardRepository, BusinessCardInformationRepository],
})
export class RepositoryModule { }
