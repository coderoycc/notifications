import { Inject, Injectable } from '@nestjs/common';

import { Notification } from '@noti-domain/entities/notification.entity';
import { SendResponse } from '@noti-domain/dtos';
import { NotificationSender } from '@noti-domain/ports/out/notification.sender';
import { EmailService } from '@noti-domain/ports/out/senders.services';
import { EMAIL_SERVICE_TK } from './tokens.senders';


@Injectable()
export class EmailSenderAdapter implements NotificationSender {
  constructor(@Inject(EMAIL_SERVICE_TK) private readonly emailService: EmailService) { }

  async send(notification: Notification): Promise<SendResponse> {
    await this.emailService.sendEmail(notification);
    return { success: true };
  }
}
