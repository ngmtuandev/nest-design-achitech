import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AmqpGatewayService {
  constructor(
    @Inject('AMQP_CLIENT')
    private readonly amqpClient: ClientProxy,
  ) {}

  /**
   * Send data to queue for RabbitMQ round robin processing
   * @param command string
   * @param data any
   */
  //async sendTo(command: string, data: any, fnCallback: any) {
  async sendTo(command: string, data: any, objCallBack: any) {
    // Keep the callback function to call back after finish
    //console.log(objCallBack);
    this.objFnCallBack = objCallBack;
    /**
     * Send to the queue of RabbitMQ, and need to add the subcribe.
     * Otherwise it won't work.
     **/
    //console.log(data);
    this.amqpClient.send({ cmd: command }, data).subscribe();
  }

  objFnCallBack: any;

  // async replyTo(withCommand: string, type: string, data: any) {
  //   // this.server.emit(withCommand, {
  //   //   type: type,
  //   //   data: data,
  //   // });
  // }
}
