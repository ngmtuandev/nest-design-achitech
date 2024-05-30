import { Module } from '@nestjs/common';
import { XhelperService } from './xhelper.service';

@Module({
  providers: [XhelperService],
  exports: [XhelperService],
})
export class XhelperModule {}
