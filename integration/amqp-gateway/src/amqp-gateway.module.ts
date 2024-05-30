import { Module } from '@nestjs/common';
import { AmqpGatewayService } from './amqp-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AmqpConsumerController } from './amqp-consumer.controller';
import { AMQPProcessing } from './amqp-processing';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AMQP_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'], //TODO: dynamic set
          queue: 'main_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [AmqpConsumerController],
  providers: [AmqpGatewayService, AMQPProcessing],
  exports: [AmqpGatewayService],
})
export class AmqpGatewayModule {}
