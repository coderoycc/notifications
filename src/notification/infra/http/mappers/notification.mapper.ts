import { Notification } from "@noti-domain/entities/notification.entity";
import { NotificationDto } from "../dtos/notification.dto";

export class NotificationMapper {
  static toNotificationDto(notification: Notification): NotificationDto {
    if (notification.id === undefined) 
      throw new Error("Notification ID is undefined");
    return {
      id: notification.id,
      title: notification.title,
      message: notification.message,
      target: notification.target,
      scheduledAt: notification.scheduledAt,
      scheduled: notification.scheduled ?? false,
    }
  }
}