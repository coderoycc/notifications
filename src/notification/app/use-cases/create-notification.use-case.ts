import { Inject, Injectable } from '@nestjs/common';
import { NotificationRepository } from '@noti-domain/outbound-ports/notification.repository';
import { NewNotificationRequest } from '../../domain/entities/schemas/create.schema';
import { CreateNotificationUseCase } from '../../domain/inbound-ports/create-notification.use-case';
import { NOTIFICATION_REPOSITORY } from '@noti-infra/orm/repository/notification-typeorm.repository';
import { Notification } from '../../domain/entities/notification.entity';

@Injectable()
export class CreateNotificationUseCaseImpl implements CreateNotificationUseCase {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY) private readonly notificationRepository: NotificationRepository
  ) {}

  async execute(request: NewNotificationRequest): Promise<Notification> {
    const notificationData = await this.notificationRepository.create(request);
    return notificationData; 
  }
}