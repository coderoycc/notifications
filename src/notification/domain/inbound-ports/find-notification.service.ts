import { Notification } from "@noti-domain/entities/notification.entity";
import { NotificationStatus, NotificationType } from "../../domain/entities/schemas";

export interface FindNotificationService {
  findAllByUserId(userId: string): Promise<Notification[]>;
  findAllByStatus(status: NotificationStatus): Promise<Notification[]>;
  findAllByType(type: NotificationType): Promise<Notification[]>;
  findAllByTarget(target: string): Promise<Notification[]>;
  listFilters(): Promise<Notification[]>;
}