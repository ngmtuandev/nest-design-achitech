import { INestApplication } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { ServerOptions } from 'socket.io';

/**
 * Redis IO Adapter will auto connect to Redis server for PUB / SUB
 */
export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;
  private static redisIoAdapter: RedisIoAdapter;

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({ url: `redis://localhost:6379` });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  /**
   * Create connection to Redis server
   * @param port number
   * @param options ServerOptions
   * @returns any
   */
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }

  /**
   * Create singleton RedisIOAdpater
   * @param app INestApplication
   * @returns RedisIoAdapter
   */
  static async createRedisIoAdapter(
    app: INestApplication,
  ): Promise<RedisIoAdapter> {
    /** Singleton to check the value undefined or not to create new instance */
    if (RedisIoAdapter.redisIoAdapter === undefined) {
      /** Create new Redis IO Adapter */
      RedisIoAdapter.redisIoAdapter = new RedisIoAdapter(app);
      /** Connect to Redis Server */
      await RedisIoAdapter.redisIoAdapter.connectToRedis();
    }

    return RedisIoAdapter.redisIoAdapter;
  }
}
