import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { AMQPProcessing } from './amqp-processing';
import { AmqpGatewayService } from './amqp-gateway.service';

@Controller()
export class AmqpConsumerController {
  constructor(
    private readonly amqpPrc: AMQPProcessing,
    private amqpSvc: AmqpGatewayService,
  ) {}

  /**
   * Receive message from AMQP queue
   * @param context RmqContext
   */
  @MessagePattern({ cmd: 'set-to-queue' })
  async receiveMessage(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    /**
     * Do action item which get the AMQP queue
     * Long task run also here
     */
    await this.amqpPrc.doProcess(
      'queueType1',
      Buffer.from(message.content).toString(),
    );

    /** Ack tell the Queue remove the message which already handled */
    channel.ack(message);

    /** Call object callback with function doCallback */
    if (this.amqpSvc.objFnCallBack) {
      this.amqpSvc.objFnCallBack.doCallback(
        Buffer.from(message.content).toString(),
      );
    }

    //Do send somthing back to the client after done
    //console.log(this.amqpSvc.server);
    // this.amqpSvc.replyTo(
    //   'do-message',
    //   'type1',
    //   Buffer.from(message.content).toString(),
    // );
  }
}
