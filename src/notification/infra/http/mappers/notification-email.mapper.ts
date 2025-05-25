import { NewNotificationRequest, NotificationType } from '@noti-domain/entities/schemas';
import { CreateNotificationEmailDto } from '../dtos/create-email-notification.dto';

export class NotificationEmailMapper {
  static toCreateRequest(dto: CreateNotificationEmailDto): NewNotificationRequest {
    return {
      title: dto.title,
      message: dto.message,
      scheduled: false,
      createdBy: dto.createdBy,
      type: NotificationType.EMAIL,
      target: dto.target,
    };
  }
  static toCreateRequestWithSchedule(dto: Required<CreateNotificationEmailDto>): NewNotificationRequest {
    return {
      title: dto.title,
      message: dto.message,
      scheduled: true,
      createdBy: dto.createdBy,
      type: NotificationType.EMAIL,
      target: dto.target,
      scheduledAt: new Date(dto.scheduledAt),
    }
  }
}