import { Notification } from '@noti-domain/entities/notification.entity';
import { SendResponse } from '@noti-domain/entities/schemas';

export interface NotificationSender {
  send(notification: Notification): Promise<SendResponse>;
}
