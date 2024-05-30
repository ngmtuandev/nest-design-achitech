import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from '@core/domain';
// import { ApplicationModule } from 'core/application/src';
// import { MiddlewareModule } from 'infrastructure/middleware/src';
// import { RepositoryModule } from 'infrastructure/repository/src';
//import { AmqpGatewayModule } from 'integration/amqp-gateway/src';
import { SocketGatewayModule } from 'integration/socket-gateway/src';
import { ApiGatewayModule } from 'integration/api-gateway/src';
import { NgwordModule } from 'core/application-ngword/src';
import { ConfigModule } from '@nestjs/config';
import { SpeechModule } from './speech/speech.module';
import { AudioModule } from './audio/audio.module';
import { MatchModule } from './match/match.module';

@Module({
  imports: [
    //AmqpGatewayModule,
    // SocketGatewayModule,
    DomainModule,
    ApiGatewayModule,
    // ApplicationModule,
    // MiddlewareModule,
    // RepositoryModule,
    NgwordModule,
    SpeechModule,
    AudioModule,
    MatchModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
