import { Notification } from '@noti-domain/entities/notification.entity';
import { EmailService } from '@noti-domain/ports/out/senders.services';
import * as nodemailer from 'nodemailer';

export class NodemailerEmailService implements EmailService {
  private transporter: nodemailer.Transporter;

  construtor(){}

  async sendEmail(noti: Notification): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: noti.target,
      subject: noti.title,
      text: noti.message,
      html: '',
    });
  }
}