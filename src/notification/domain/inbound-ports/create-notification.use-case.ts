import { NewNotificationRequest } from "../entities/schemas/create.schema";
import { NotificationStatus } from "../entities/schemas";

export interface CreateNotificationUseCase {
  execute(data: NewNotificationRequest): Promise<NotificationStatus>;
}