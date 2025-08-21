import { Notification } from '@noti-domain/entities/notification.entity';
import { EmailService } from '@noti-domain/ports/out/senders.services';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NodemailerEmailService implements EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService){ }

  async loadMailerInstance(): Promise<void>  {
    const host = this.configService.get('MAIL_HOST');
    const username = this.configService.get('MAIL_USER');
    const password = this.configService.get('MAIL_PASS');
    this.transporter = nodemailer.createTransport({
      host: host,
      port: 587,
      secure: false,
      auth: {
        user: username,
        pass: password,
      },
    } as SMTPTransport.Options);
  }

  async sendEmail(noti: Notification): Promise<void> {
    await this.loadMailerInstance();
    await this.transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: noti.target,
      subject: noti.title,
      text: noti.message,
      html: '',
    });
  }
}