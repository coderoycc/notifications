import { Injectable } from '@nestjs/common';

import { Notification } from '@noti-domain/entities/notification.entity';
import { SendResponse } from '@noti-domain/dtos';
import { NotificationSender } from '@noti-domain/ports/out/notification.sender';


@Injectable()
export class EmailSenderAdapter implements NotificationSender {
  constructor(
  ) { }

  async send(notification: Notification): Promise<SendResponse> {
    return new Promise(async (resolve, reject) => {

    })
  }
}

export const TKEmailSender = Symbol('TKEmailSender');