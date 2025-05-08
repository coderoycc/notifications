import { NotificationType } from "@noti-domain/entities/schemas";

export class CreateNotificationDto {
  title: string;
  message: string;
  scheduled: boolean;
  scheduledAt?: Date;
  type: NotificationType;
  target: string;
  createdBy: string;
}