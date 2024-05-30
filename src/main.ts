import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
      validationError: {
        target: false,
      },
      transform: true,
    }),
  );

  /** Use Socket Adapter via Redis Adapter */
  // const redisIoAdapter = await RedisIoAdapter.createRedisIoAdapter(app);
  // app.useWebSocketAdapter(redisIoAdapter);

  /** Initialized the AMQP (Rabbit MQ) */
  // AMQPInitialization.createAMQP(app);
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  /** Start all micro services as default */
  app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
