import { Notification } from "@noti-domain/entities/notification.entity";
import { NewNotificationRequest } from "../entities/schemas/create.schema";

export interface CreateNotificationUseCase {
  execute(data: NewNotificationRequest): Promise<Notification>;
}