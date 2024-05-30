import {
  ActionDetail,
  ActionType,
  MessageRequest,
} from '@infrastructure/message';
import { Constant } from '@infrastructure/xhelper';
import { XloggerService } from '@infrastructure/xlogger';
import { Inject } from '@nestjs/common';
import { Server } from 'socket.io';

/**
 * Abtract class as Strategy Pattern
 */
export abstract class MessageProcessing {
  private _server: Server;
  private _command = Constant.MESSAGE_EVENT_RESULT_NAME;

  get server() {
    return this._server;
  }
  set server(s: Server) {
    this._server = s;
  }

  get command() {
    return this._command;
  }
  set command(cmd: string) {
    this._command = cmd;
  }
  setServer(s: Server): void {
    this._server = s;
  }

  /**
   * Producer: do process
   * @param data any
   */
  abstract doProcess(data: any): any;
  abstract messageCbProcess(data: any): any;

  /**
   * Consumer: do process
   * @param data any
   */
  doCallback(data: any): any {
    const retPrcDat = this.messageCbProcess(data);

    // const a = new MessageRequest();
    // a.userId = 'abd-eke-12';
    // a.blood = 12;
    // a.cameraPosition = [2, 5, 4];
    // a.actionType = ActionType.MOVE_FORWARD;
    // a.actionDetail = new ActionDetail();
    // a.actionDetail.position = [2, 5, 10];
    // a.actionDetail.quaternion = 3.14;

    /** Broadcast message after finished. */
    this.messageBroadcasting(this.command, retPrcDat);
  }

  /**
   * Broadcast message
   * @param command string
   * @param data any
   */
  async messageBroadcasting(command: string, data: any) {
    if (this.server) {
      this.server.emit(command, data);
    }
  }
}
