import { NotificationStatus, NotificationType } from "../../domain/entities/schemas";

export interface FindNotificationService {
  findById(id: string): Promise<Notification | null>;
  findAllByUserId(userId: string): Promise<Notification[]>;
  findAllByStatus(status: NotificationStatus): Promise<Notification[]>;
  findAllByType(type: NotificationType): Promise<Notification[]>;
  findAllByTarget(target: string): Promise<Notification[]>;
  findAll(): Promise<Notification[]>;
}