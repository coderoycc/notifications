import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../ports/notification.repository';
import { CreateNotificationRequest } from '../../domain/entities/schemas/create.schema';
import { CreateNotificationUseCase } from '../../domain/inbound-ports/create-notification.use-case';
import { NotificationStatus } from '@noti/domain/types';

@Injectable()
export class  CreateNotificationUseCaseImpl implements CreateNotificationUseCase {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async execute(request: CreateNotificationRequest): Promise<NotificationStatus> {
    
  }
}