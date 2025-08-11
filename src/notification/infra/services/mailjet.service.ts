import { Injectable } from "@nestjs/common";
import { Notification } from "@noti-domain/entities/notification.entity";
import { EmailService } from "@noti-domain/ports/out/senders.services";
import Mailjet from "node-mailjet";
@Injectable()
export class MailjetService implements EmailService {
  private mailjetClient: Mailjet;
  constructor() {
    this.mailjetClient = new Mailjet({
      apiKey: process.env.MJ_MAIL_API_KEY,
      apiSecret: process.env.MJ_MAIL_SECRET_KEY,
    })  
  }
  sendEmail(notification: Notification): Promise<void> {

  }
}