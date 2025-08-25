import { Inject, Injectable } from '@nestjs/common';
import { NotificationRepository, CreateNotificationUseCase } from '@noti-domain/ports';
import { NewNotificationCommand } from '@noti-domain/dtos';
import { NOTIFICATION_REPOSITORY } from "@noti-domain/tokens";
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

  async execute(request: NewNotificationCommand): Promise<Notification> {
    if (!request.createdBy)
      throw new SenderQuotaExceededException(request.createdBy, 200);

    const notificationData = await this.notificationRepository.create(request);
    return notificationData;
  }
}
