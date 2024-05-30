import { Module } from '@nestjs/common';

@Module({
  providers: [Audio],
  exports: [Audio],
})
export class DomainAudioModule {}
