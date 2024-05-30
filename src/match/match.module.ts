import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchEntity } from './entity/match.entity';
import { MatchService } from './match.service';
import { MatchRepository } from './repo/audio.repository';

@Module({
  providers: [MatchService, MatchRepository],
  imports: [TypeOrmModule.forFeature([MatchEntity])],
  exports: [TypeOrmModule],
  controllers: [MatchController],
})
export class MatchModule {}
