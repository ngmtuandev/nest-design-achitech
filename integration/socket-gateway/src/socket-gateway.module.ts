import { Module } from '@nestjs/common';
import { MessageGateway } from './message-gateway';
import { AmqpGatewayModule } from '@integration/amqp-gateway';
import { MessageCoordinator } from './message-coordinator';
import { XloggerModule } from '@infrastructure/xlogger';
import { XhelperModule } from '@infrastructure/xhelper';
import { MessageModule } from '@infrastructure/message';

@Module({
  imports: [AmqpGatewayModule, XloggerModule, XhelperModule, MessageModule],
  providers: [MessageGateway, MessageCoordinator],
  exports: [MessageGateway, MessageCoordinator],
})
export class SocketGatewayModule {}
