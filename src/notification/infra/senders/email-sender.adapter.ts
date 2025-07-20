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

  async send(notification: Notification): Promise<SendResponse> {
    try {
      const tenant = await this.getTenant.load('ADADA');
      if (tenant === null) throw new Error('Tenant not found');
      console.log(tenant, 'Tentant details')
      return {} as SendResponse;
    } catch (error) {
      throw error;
    }
  }
}
