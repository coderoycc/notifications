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
  WEBHOOK = 'webhook',
} 