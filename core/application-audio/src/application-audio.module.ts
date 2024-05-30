import { Module } from '@nestjs/common';
import { AudioService } from './application-audio.service';

@Module({
  imports: [],
  providers: [AudioService],
  exports: [],
})
export class AudioModule {}
