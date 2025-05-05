import { NotificationType } from "./notification-props.schema";

export interface CreateNotificationRequest {
  title: string;
  message: string;
  scheduled: boolean;
  scheduledAt?: Date;
  type?: NotificationType;
  target: string;
  createdBy: string;
}