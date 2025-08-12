import { Inject } from '@nestjs/common';
import { Notification } from '@noti-domain/entities/notification.entity';
import { NotificationLogger } from '@noti-domain/ports/out/notification.logger';
import { NotificationSender } from '@noti-domain/ports/out/notification.sender';
import { EMAIL_SENDER_TK } from '@noti-infra/senders/tokens.senders';

export class SendEmailNotificationUseCase {
  constructor(
    @Inject(EMAIL_SENDER_TK) private readonly emailSender: NotificationSender,
    // @Inject() private readonly loggerEmail: NotificationLogger
  ) { }

  async execute(notification: Notification): Promise<void> {
    const response = await this.emailSender.send(notification);
    console.log('Email sent successfully:', response);
  }
}
