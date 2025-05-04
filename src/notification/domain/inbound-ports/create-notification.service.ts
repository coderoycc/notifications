import { NotificationStatus } from "../types";

export interface CreateNotificationService {
  saveNotification(): Promise<NotificationStatus>;
  beforeNotification(): Promise<boolean>;
  afterNotification(): Promise<boolean>;
}