import { Inject } from '@nestjs/common';
import { Notification } from '@noti-domain/entities/notification.entity';
import { SendNotificationUseCase, NotificationSender } from '@noti-domain/ports';
import { EMAIL_SENDER_TK } from '@noti-infra/senders/tokens.senders';

export class SendEmailNotificationUseCase implements SendNotificationUseCase {
  constructor(
    @Inject(EMAIL_SENDER_TK) private readonly emailSender: NotificationSender,
    // @Inject() private readonly loggerEmail: NotificationLogger
  ) { }

  async execute(notification: Notification): Promise<void> {
    const response = await this.emailSender.send(notification);
    console.log('Email sent successfully:', response);
  }
}
