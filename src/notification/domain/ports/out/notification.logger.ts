import { Notification } from "@noti-domain/entities/notification.entity";

export interface NotificationLogger {
  logSuccess(notification: Notification): Promise<void>;
  logFailure(notification: Notification, error: string): Promise<void>;
}