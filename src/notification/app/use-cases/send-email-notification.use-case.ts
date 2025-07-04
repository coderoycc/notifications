import { Notification } from '@noti-domain/entities/notification.entity';

export class SendEmailNotificationUseCase {
  constructor() {}
  async execute(notification: Notification): Promise<void> {}
}
