import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export class AMQPInitialization {
  static user = 'admin';
  static password = 'admin';
  static host = 'localhost';

  /**
   * Create Rabbit MQ instance
   * @param app INestApplication
   */
  static async createAMQP(app: INestApplication) {
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${AMQPInitialization.user}:${AMQPInitialization.password}@${AMQPInitialization.host}:5672`,
        ],
        queue: 'main_queue',
        queueOptions: {
          durable: true,
        },
        noAck: false,
        prefetchCount: 1, //get on message
      },
    });
  }
}
