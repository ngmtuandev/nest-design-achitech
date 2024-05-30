import { Expose } from 'class-transformer';
import { ActionType } from './action-type';
import { ActionDetail } from './action-detail';

export class MessageResponse {
  @Expose({ name: 'user_id' })
  userId: string;

  @Expose({ name: 'blood' })
  blood: number;

  @Expose({ name: 'camera_position' })
  cameraPosition: string;

  @Expose({ name: 'action_type' })
  actionType: ActionType;

  @Expose({ name: 'action_detail' })
  actionDetail: ActionDetail;
}
