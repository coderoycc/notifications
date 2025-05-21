import { Notification } from "@noti-domain/entities/notification.entity";
import { NotificationEntity } from "../entities/notification.entity";

export class NotificationMapper {
  static toDomain(notification: NotificationEntity): Notification {
    const notiResp = new Notification();
    notiResp.loadFromPersistence(notification);
    return notiResp;
  }

  static toPersistence(notification: Notification): any {
    return {
      id: notification.id,
      title: notification.title,
      message: notification.message,
      createdAt: notification.createdAt,
      scheduled: notification.scheduled,
      scheduledAt: notification.scheduledAt,
      status: notification.status,
      type: notification.type,
      target: notification.target,
      createdBy: notification.createdBy
    };
  }
}