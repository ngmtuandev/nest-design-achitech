import { MessageProcessing } from '../message.processing';

export class Message2Processing implements MessageProcessing {
  doProcess(data: any) {
    console.log('Message2Processing');
    console.log(data);
  }
  doCallback(data: any): any {
    console.log(data);
  }
}
