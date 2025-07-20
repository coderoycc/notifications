import { Inject } from '@nestjs/common';
import { Notification } from '@noti-domain/entities/notification.entity';
import { EmailSenderAdapter } from '@noti-infra/senders/email-sender.adapter';

export class SendEmailNotificationUseCase {
  constructor(private readonly emailSender: EmailSenderAdapter) {}
  async execute(notification: Notification): Promise<void> {
    const response = await this.emailSender.send(notification);
    console.log('Email sent successfully:', response);
  }
}
