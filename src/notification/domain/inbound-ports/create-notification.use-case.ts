import { CreateNotificationRequest } from "../entities/schemas/create.schema";
import { NotificationStatus } from "../entities/schemas";

export interface CreateNotificationUseCase {
  execute(data: CreateNotificationRequest): Promise<NotificationStatus>;
}