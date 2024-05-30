import { Module } from '@nestjs/common';
import { XloggerService } from './xlogger.service';
import { XhelperModule } from 'infrastructure/xhelper/src';

@Module({
  imports: [XhelperModule],
  providers: [XloggerService],
  exports: [XloggerService],
})
export class XloggerModule {}
