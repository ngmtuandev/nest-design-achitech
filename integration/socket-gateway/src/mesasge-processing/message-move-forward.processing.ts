import { Injectable } from '@nestjs/common';
import { MessageProcessing } from '../message.processing';
import { MessageResponse } from '@infrastructure/message';

@Injectable()
export class MessageMoveForwardProcessing extends MessageProcessing {
  constructor() {
    super();
  }

  doProcess(data: any): any {
    //console.log(data);
    return data;
  }

  /**
   * Message callback process
   * @param data any
   */
  messageCbProcess(data: any): any {
    console.log('doCallback in Move');
    const response: MessageResponse = JSON.parse(data).data;
    console.log(response);
    return response;
  }
}
