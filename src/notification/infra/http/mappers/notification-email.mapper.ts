import { CreateNotificationRequest } from '@noti-domain/entities/schemas';
import { CreateNotificationDto } from '../dtos/create-notification.dto';

export class NotificationEmailMapper {
  static toCreateRequest(dto: CreateNotificationDto): CreateNotificationRequest {
    return {
      title: dto.title,
      message: dto.message,
      scheduled: false,
      createdBy: dto.createdBy,
      type: 'email',
      target: dto.target, 
    };
  }
  static toCreateRequestWithSchedule(dto: Required<CreateNotificationDto>): CreateNotificationRequest {
    return {
      title: dto.title,
      message: dto.message,
      scheduled: true,
      createdBy: dto.createdBy,
      type: 'email',
      target: dto.target,
      scheduledAt: new Date(dto.scheduledAt),
    }
  }
}