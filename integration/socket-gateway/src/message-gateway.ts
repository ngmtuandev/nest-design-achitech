import {
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageCoordinator } from './message-coordinator';
import { XloggerService } from '@infrastructure/xlogger';
import { Constant } from '@infrastructure/xhelper';
import { MessageRequest } from '@infrastructure/message';

/**
 * Message gateway (socket) handler
 * Subcribe the message from the clients and dispatcher to message handling
 */
@WebSocketGateway({ cors: { origin: '*' }, transports: ['websocket'] })
export class MessageGateway implements OnGatewayInit {
  @WebSocketServer() public server: Server;
  /**
   * Inject message coordiator to the gateway to dispatch the message process
   * @param msgCrd message coordinator
   */
  constructor(
    private readonly msgCrd: MessageCoordinator,
    private readonly logger: XloggerService,
  ) {}

  /**
   * Consume the message from client with event naming: do-message
   * @param data any which passed from the clients
   */
  @SubscribeMessage(Constant.MESSAGE_EVENT_NAME)
  async handleEvent(@MessageBody() data: any) {
    this.logger.debug(Constant.MESSAGE_EVENT_NAME + ' occured ...');

    try {
      this.logger.debug(JSON.stringify(data));
      //Validate the pattern of data before bypass to AMPQ
      const msgReq: MessageRequest = JSON.parse(JSON.stringify(data));
      this.msgCrd.doProcess(msgReq.actionType, msgReq);
    } catch (ex: any) {
      this.logger.error(ex);
      // TODO: return error?
    }
  }

  afterInit() {
    /** Set keep the server on service for reuse */
    this.msgCrd.server = this.server;
  }
}
