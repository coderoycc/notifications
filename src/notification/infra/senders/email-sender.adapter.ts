import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'; // O tu librería de email preferida

import { Notification } from '@noti-domain/entities/notification.entity';
import { SendResponse } from '@noti-domain/entities/schemas';
import { NotificationSender } from '@noti-domain/outbound-ports/notification.sender';
import { LoadDataFileTK } from 'src/tenant/infra/external/get-from-file.adapter';
import { LoadTenantDataPort } from 'src/tenant/domain/outbound-ports/load-tenant-data';


@Injectable()
export class EmailSenderAdapter implements NotificationSender {
  constructor(
    @Inject(LoadDataFileTK)
    private readonly getTenant: LoadTenantDataPort,
  ) { }
  private transporter:  nodemailer.Transporter;

  private async initializeTransporter(tenantId: string): Promise<void> {
    const tenant = await this.getTenant.load(tenantId);
    if (tenant === null) throw new Error('Tenant not found');

    this.transporter = nodemailer.createTransport({
      host: 'host.example.com',
      port: 465,
      secure: true,
      auth: {
        user: tenant.email,
        pass: tenant.pass,
      },
    });
  }
  async send(notification: Notification): Promise<SendResponse> {
    try {
      await this.initializeTransporter('default');
      const mailOptions = {
        from: `NITIFICATION <${notification.createdBy}>`,
        to: notification.target,
        subject: notification.title,
        text: notification.message,
        html: `<p>${notification.message}</p>`,
      };
      await this.transporter.sendMail(mailOptions);

      const sendResponse: SendResponse = {
        success: true,
        message: `Email sent successfully to ${notification.target}`,
        notificationId: notification.id,
      }
      return sendResponse;
    } catch (error) {
      throw error;
    }
  }
}

export const TKEmailSender = Symbol('TKEmailSender');