import { NotificationType } from "./notification-props.dto";

export interface NewNotificationCommand {
  title: string;
  message: string;
  scheduled: boolean;
  scheduledAt?: Date;
  type: NotificationType;
  target: string;
  createdBy: string;
  createdAt: Date;
}