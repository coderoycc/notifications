import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '@noti-domain/outbound-ports/notification.repository';
import { CreateNotificationRequest } from '../../domain/entities/schemas/create.schema';
import { CreateNotificationUseCase } from '../../domain/inbound-ports/create-notification.use-case';
import { NotificationStatus } from '../../domain/entities/schemas';

@Injectable()
export class  CreateNotificationUseCaseImpl implements CreateNotificationUseCase {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async execute(request: CreateNotificationRequest): Promise<NotificationStatus> {
    const notification = await this.notificationRepository.create(request);
    return notification.status ?? 'failed';
  }
}