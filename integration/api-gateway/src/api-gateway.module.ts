import { ApplicationModule } from '@core/application';
import { XloggerModule } from '@infrastructure/xlogger';
import { Module } from '@nestjs/common';
import { BusinessCardModule } from 'core/application-business-card/src/application-business-card.module';
import { ApiGatewayService } from './api-gateway.service';
import { BusinessCardController } from './business-card.controller';
import { WordController } from './word.controller';
import { WordService } from '@core/application-ngword';
import { WordRepository } from '@infrastructure/repository-ngword';

@Module({
  imports: [ApplicationModule, XloggerModule, BusinessCardModule],
  controllers: [BusinessCardController, WordController],
  providers: [ApiGatewayService, WordService, WordRepository],
  exports: [ApiGatewayService],
})
export class ApiGatewayModule {}
