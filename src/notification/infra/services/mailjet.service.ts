import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Notification } from '@noti-domain/entities/notification.entity';
import { EmailService } from '@noti-domain/ports/out/senders.services';
import Mailjet from 'node-mailjet';

@Injectable()
export class MailjetService implements EmailService {
  private mailjetClient: Mailjet;

  constructor(private readonly configService: ConfigService) {
    const mailApiKey = this.configService.get<string>('MJ_MAIL_API_KEY');
    const mailSecretKey = this.configService.get<string>('MJ_MAIL_SECRET_KEY');
    this.mailjetClient = new Mailjet({
      apiKey: mailApiKey,
      apiSecret: mailSecretKey,
    });
  }

  async sendEmail(notification: Notification): Promise<void> {
    try {
      const request = await this.mailjetClient
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: this.configService.get<string>('MAIL_USER'),
                Name: notification.title,
              },
              To: [
                {
                  Email: notification.target,
                  Name: notification.title,
                },
              ],
              Subject: notification.title,
              TextPart: notification.message,
            },
          ],
        });
      console.log(request.response, request.body, request.response.data);
      if (request.response.status === 200) 
        Logger.log('Email sent successfully', MailjetService.name);
    } catch (error) {
      Logger.error(error, MailjetService.name);
      throw error;
    }
  }
}
