import { Notification } from "@noti-domain/entities/notification.entity";
import { NewNotificationCommand } from "../../dtos";

export interface CreateNotificationUseCase {
  execute(data: NewNotificationCommand): Promise<Notification>;
}