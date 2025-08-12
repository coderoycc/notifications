import { Injectable } from "@nestjs/common";
import { Notification } from "@noti-domain/entities/notification.entity";
import { EmailService } from "@noti-domain/ports/out/senders.services";
import { GetTenantFromFileUseCase } from "@tenant-app/use-cases/get-from-file.use-case";
import Mailjet from "node-mailjet";

@Injectable()
export class MailjetService implements EmailService {
  private mailjetClient: Mailjet;
  constructor(private readonly tenantUc: GetTenantFromFileUseCase) {
    this.mailjetClient = new Mailjet({
      apiKey: process.env.MJ_MAIL_API_KEY,
      apiSecret: process.env.MJ_MAIL_SECRET_KEY,
    })
  }
  async loadInstance(tenantId: string): Promise<void> {
    const tenant = await this.tenantUc.execute(tenantId);
    console.log(tenant)
  }
  async sendEmail(notification: Notification): Promise<void> {
    try {
      const request = await this.mailjetClient.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: "betocarlis11@gmail.com",
              Name: "Beto Carlis Test",
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
      })
      console.log(request.response, request.body)
      if(request.response.status === 200) {
        console.log("Email sent successfully");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      throw error; 
    }
  }
}