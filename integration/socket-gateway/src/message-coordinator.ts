import { Injectable } from '@nestjs/common';
import { AmqpGatewayService } from '@integration/amqp-gateway';
import { Server } from 'socket.io';
import { MessageProcessing } from './message.processing';
import { MessageMoveForwardProcessing } from './mesasge-processing/message-move-forward.processing';
import { MessageMoveBackwardProcessing } from './mesasge-processing/message-move-backward.processing';
import { ActionType } from '@infrastructure/message';

/**
 * The messages will be processed internally
 * Send the message to AMQP
 * Waiting for the value return from AMQP in callback function
 */
@Injectable()
export class MessageCoordinator {
  private _server: Server;
  /** User to find the base on type */
  private msgPrcDispatcher: Map<ActionType, MessageProcessing> = new Map();

  /**
   * Constructor
   * @param amqpGateway Inject the Amqp Gateway service
   */
  constructor(private readonly amqpGateway: AmqpGatewayService) {
    /** Register all message processing. */
    const mmp = new MessageMoveForwardProcessing();
    const mrp = new MessageMoveBackwardProcessing();
    this.msgPrcDispatcher.set(ActionType.MOVE_FORWARD, mmp);
    this.msgPrcDispatcher.set(ActionType.MOVE_BACKWARD, mrp);
  }

  /**
   * Process the message receive from clients
   * @param type string
   * @param data any
   */
  doProcess(actionType: ActionType, data: any): any {
    const msgPrc: MessageProcessing = this.msgPrcDispatcher.get(actionType);
    if (msgPrc) {
      if (msgPrc.server === undefined) {
        /** set server to message processing for further use */
        msgPrc.server = this.server;
      }
      const retData = msgPrc.doProcess(data);
      /** Send data to AMQP to process and wait to recevied the callback return */
      this.amqpGateway.sendTo('set-to-queue', retData, msgPrc);
    }
  }

  /** Get the server variable */
  get server() {
    return this._server;
  }

  /** Set the server variable  */
  set server(s: Server) {
    this._server = s;
  }
}
