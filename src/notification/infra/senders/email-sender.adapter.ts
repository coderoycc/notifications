import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'; // O tu librería de email preferida

import { Notification } from '@noti-domain/entities/notification.entity';
import { SendResponse } from '@noti-domain/entities/schemas';
import { NotificationSender } from '@noti-domain/outbound-ports/notification.sender';
import { JsonTenantCredentialsAdapter } from '@shared-infra/sources/credentials.file-adapter';

@Injectable()
export class EmailSenderAdapter implements NotificationSender {
  private transporter: nodemailer.Transporter;

  async send(notification: Notification): Promise<SendResponse> {
    try {
    } catch (error) {
      throw error;
    }
  }
}
