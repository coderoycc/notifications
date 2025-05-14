import { Inject, Injectable } from '@nestjs/common';
import { NotificationRepository } from '@noti-domain/outbound-ports/notification.repository';
import { CreateNotificationRequest } from '../../domain/entities/schemas/create.schema';
import { CreateNotificationUseCase } from '../../domain/inbound-ports/create-notification.use-case';
import { NotificationStatus } from '../../domain/entities/schemas';
import { NOTIFICATION_REPOSITORY } from '@noti-infra/orm/repository/notification-typeorm.repository';

@Injectable()
export class CreateNotificationUseCaseImpl implements CreateNotificationUseCase {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY) private readonly notificationRepository: NotificationRepository
  ) {}

  async execute(request: CreateNotificationRequest): Promise<NotificationStatus> {
    const notification = await this.notificationRepository.create(request);
    return notification.status ?? NotificationStatus.PENDING; 
  }
}