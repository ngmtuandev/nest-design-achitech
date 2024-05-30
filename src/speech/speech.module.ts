import { Module } from '@nestjs/common';
import { SpeechService } from './speech.service';
import { SpeechController } from './speech.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeakerEntity } from './entity/speaker.entity';
import { SpeakerRepository } from './repo/audio.repository';

@Module({
  providers: [SpeechService, SpeakerRepository],
  imports: [TypeOrmModule.forFeature([SpeakerEntity])],
  exports: [SpeechService, TypeOrmModule],
  controllers: [SpeechController],
})
export class SpeechModule {}
