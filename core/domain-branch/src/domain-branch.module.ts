import { Module } from '@nestjs/common';
import { Branch } from './branch.entity';

@Module({
  providers: [Branch],
  exports: [Branch],
})
export class DomainBranchModule {}
