import { Inject } from '@nestjs/common';
import { Notification } from '@noti-domain/entities/notification.entity';
import { NotificationLogger } from '@noti-domain/ports/out/notification.logger';
import { NotificationSender } from '@noti-domain/ports/out/notification.sender';
import { TKEmailSender } from '@noti-infra/senders/email-sender.adapter';

export class SendEmailNotificationUseCase {
  constructor(
    @Inject(TKEmailSender) private readonly emailSender: NotificationSender,
    @Inject() private readonly loggerEmail: NotificationLogger
  ) { }

  async execute(notification: Notification): Promise<void> {
    const response = await this.emailSender.send(notification);
    console.log('Email sent successfully:', response);
  }
}
