export enum NotificationStatus {
  PENDING = 'pending', 
  SCHEDULED = 'scheduled', 
  SENT = 'sent',
  FAILED = 'failed',
}
export enum NotificationType {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
} 

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
}