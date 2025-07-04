import { Inject, Injectable } from '@nestjs/common';
import { NotificationRepository } from '@noti-domain/outbound-ports/notification.repository';
import { NewNotificationRequest } from '@noti-domain/entities/schemas/create.schema';
import { CreateNotificationUseCase } from '@noti-domain/inbound-ports/create-notification.use-case';
import { NOTIFICATION_REPOSITORY } from '@noti-infra/orm/repository/notification-typeorm.repository';
import { Notification } from '@noti-domain/entities/notification.entity';
import { SenderQuotaExceededException } from '@noti-domain/exceptions/notification.exceptions';

@Injectable()
export class CreateNotificationUseCaseImpl
  implements CreateNotificationUseCase
{
  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(request: NewNotificationRequest): Promise<Notification> {
    if (!request.createdBy)
      throw new SenderQuotaExceededException(request.createdBy, 200);

    const notificationData = await this.notificationRepository.create(request);
    return notificationData;
  }
}

