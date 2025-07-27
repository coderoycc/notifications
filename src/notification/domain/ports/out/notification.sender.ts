import { Notification } from '@noti-domain/entities/notification.entity';
import { SendResponse } from '../../dtos';

export interface NotificationSender {
  send(notification: Notification): Promise<SendResponse>;
}
