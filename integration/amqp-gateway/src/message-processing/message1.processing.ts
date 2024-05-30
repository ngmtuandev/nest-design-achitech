import { MessageProcessing } from '../message.processing';

export class Message1Processing implements MessageProcessing {
  doProcess(data: any) {
    console.log('Message1Processing');
    console.log(data);
  }
  doCallback(data: any): any {
    console.log(data);
  }
}
