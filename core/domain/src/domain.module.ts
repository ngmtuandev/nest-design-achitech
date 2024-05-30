import { BusinessCard, BusinessCardInformation } from '@core/domain-business-card';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainService } from './domain.service';
import { Word } from 'core/domain-ngword/src';
import { AudioEntity } from 'src/audio/entity/audio.entity';
import { SpeakerEntity } from 'src/speech/entity/speaker.entity';
import { MatchEntity } from 'src/match/entity/match.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT')),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [BusinessCard, BusinessCardInformation, Word, AudioEntity, SpeakerEntity, MatchEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DomainService],
  exports: [DomainService],
})
export class DomainModule { }
