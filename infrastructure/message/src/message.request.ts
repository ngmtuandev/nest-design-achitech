import { Expose } from 'class-transformer';
import { ActionDetail } from './action-detail';
import { ActionType } from './action-type';

export class MessageRequest {
  @Expose({ name: 'user_id' })
  userId: string;

  @Expose({ name: 'blood' })
  blood: number;

  @Expose({ name: 'camera_position' })
  cameraPosition: number[];

  @Expose({ name: 'action_type' })
  actionType: ActionType;

  @Expose({ name: 'action_detail' })
  actionDetail: ActionDetail;
}
