import { Notification } from "@noti-domain/entities/notification.entity";

export interface SendNotificationUseCase {
  execute(notification: Notification): Promise<void>;
}