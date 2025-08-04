import { Notification } from '@noti-domain/entities/notification.entity';
import { EmailService } from '@noti-domain/ports/out/senders.services';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { GetTenantFromFileUseCase } from 'src/tenant/app/use-cases/get-from-file.use-case';
import { Tenant } from 'src/tenant/domain/entities/tenant';

export class NodemailerEmailService implements EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly tenantUc: GetTenantFromFileUseCase){
    const dataTenant = this.tenantUc.execute('');
    dataTenant.then((tenant: Tenant | null) => {
      if (!tenant) {
        throw new Error('Tenant not found');
      }
      this.transporter = nodemailer.createTransport({
        host: 'smtp.example.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: tenant.name,
          pass: tenant.pass,
        },
      } as SMTPTransport.Options);
     });
  }

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