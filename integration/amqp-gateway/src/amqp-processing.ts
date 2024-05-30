import { Injectable } from '@nestjs/common';
import { MessageProcessing } from './message.processing';
import { Message1Processing } from './message-processing/message1.processing';
import { Message2Processing } from './message-processing/message2.processing';

/**
 * Process the message which produce from RabbitMQ
 */
@Injectable()
export class AMQPProcessing {
  private msgsPrces: Map<string, MessageProcessing> = new Map();

  constructor() {
    /** Register all items processing. */
    this.msgsPrces.set('queueType1', new Message1Processing());
    this.msgsPrces.set('queueType2', new Message2Processing());
  }

  doProcess(type: string, data: any): any {
    const itemPrc = this.msgsPrces.get(type);
    if (itemPrc) {
      itemPrc.doProcess(data);
    }
  }
}
