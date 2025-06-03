import { NewNotificationRequest, NotificationType } from '@noti-domain/entities/schemas';
import { CreateNotificationEmailDto } from '../dtos/create-email-notification.dto';
import { nowUTC, toUTC } from 'src/shared/utils/date-management.util';

export class NotificationEmailMapper {
  static toCreateRequest(dto: CreateNotificationEmailDto): NewNotificationRequest {
    const createdAt = nowUTC();
    return {
      title: dto.title,
      message: dto.message,
      scheduled: false,
      createdBy: dto.createdBy,
      type: NotificationType.EMAIL,
      target: dto.target,
      createdAt,
    };
  }
  static toCreateRequestWithSchedule(dto: Required<CreateNotificationEmailDto>): NewNotificationRequest {
    const scheduledAt = toUTC(dto.scheduledAt, dto.timezone || 'UTC');
    const createdAt = nowUTC();
    return {
      title: dto.title,
      message: dto.message,
      scheduled: true,
      createdBy: dto.createdBy,
      type: NotificationType.EMAIL,
      target: dto.target,
      scheduledAt,
      createdAt,
    }
  }
}