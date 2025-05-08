import { Notification } from "@noti-domain/entities/notification.entity";

export interface NotificationRepository {
  create(notification: Partial<Notification>): Promise<Notification>;
  update(notification: Partial<Notification>): Promise<Notification>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Notification | null>;
  findAllByTarget(target: string): Promise<Notification[]>;
  findByUserId(target: string): Promise<Notification[]>;
}