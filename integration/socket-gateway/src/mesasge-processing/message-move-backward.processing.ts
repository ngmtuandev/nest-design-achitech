import { Injectable } from '@nestjs/common';
import { MessageProcessing } from '../message.processing';

@Injectable()
export class MessageMoveBackwardProcessing extends MessageProcessing {
  constructor() {
    super();
  }
  doProcess(data: any): any {
    console.log('In message run');
    console.log(data);
    return data;
  }

  messageCbProcess(data: any): any {
    console.log('doCallback in Run');
    console.log(data);
  }
}
