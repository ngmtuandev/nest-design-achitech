import { DomainBusinessCardModule } from '@core/domain-business-card';
import { Module } from '@nestjs/common';
import { RepositoryNgwordService } from './repository.ngword.service';
import { WordRepository } from './word.repository';

@Module({
  imports: [DomainBusinessCardModule],
  providers: [RepositoryNgwordService, WordRepository],
  exports: [RepositoryNgwordService, WordRepository],
})
export class RepositoryNgwordModule { }
