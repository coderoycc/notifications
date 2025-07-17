import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'; // O tu librería de email preferida

import { Notification } from '@noti-domain/entities/notification.entity';
import { SendResponse } from '@noti-domain/entities/schemas';
import { NotificationSender } from '@noti-domain/outbound-ports/notification.sender';
import { GetTenantByCodePort } from 'src/tenant/domain/inbound-ports/get-tenant.port';

@Injectable()
export class EmailSenderAdapter implements NotificationSender {
  constructor(
    @Inject('GetTenantByCodePort')
    private readonly getTenant: GetTenantByCodePort,
  ) {}

  async send(notification: Notification): Promise<SendResponse> {
    try {
      const tenant = await this.getTenant.execute('ADADA');
      if (tenant === null) throw new Error('Tenant not found');
      return {} as SendResponse;
    } catch (error) {
      throw error;
    }
  }
}
