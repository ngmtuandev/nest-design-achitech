import { Module } from '@nestjs/common';
import { RepositoryNgwordModule } from 'infrastructure/repository-ngword/src/repository.ngword.module';
import { WordService } from './word.service';

@Module({
  imports: [RepositoryNgwordModule],
  providers: [WordService],
  exports: [WordService],
})
export class NgwordModule {}
