export interface NotificationRepository {
  create(notification: Notification): Promise<Notification>;
  update(notification: Partial<Notification>): Promise<Notification>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Notification | null>;
  findAllByTarget(target: string): Promise<Notification[]>;
  findByUserId(target: string): Promise<Notification[]>;
}