import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // Para obtener configuración
// import * as nodemailer from 'nodemailer'; // O tu librería de email preferida

import { Notification } from '@noti-domain/entities/notification.entity';
import { SendResponse } from '@noti-domain/entities/schemas';
import { NotificationSender } from '@noti-domain/outbound-ports/notification.sender';

@Injectable()
export class EmailSenderAdapter implements NotificationSender {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    // Configuración específica para email
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: this.configService.get<boolean>('EMAIL_SECURE'),
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  async send(notification: Notification): Promise<SendResponse> {
    if (notification.type !== 'email') {
    }

    try {
      const info = await this.transporter.sendMail({
        from: this.configService.get<string>('EMAIL_FROM'),
        to: notification.createdAt,
        subject: notification.createdAt,
        html: notification.message,
      });
    } catch (error) {
      throw error;
    }
  }
}
