import {
  NotificationStatus,
  NotificationType,
} from '../entities/notification.enums';
export type NotificationProps = {
  id: string;
  title: string;
  message: string;
  createdAt: Date;
  scheduled: boolean;
  scheduledAt?: Date;
  status: NotificationStatus;
  type: NotificationType;
  target: string;
  createdBy?: string;
};

