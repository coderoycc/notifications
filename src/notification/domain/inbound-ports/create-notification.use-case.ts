import { CreateNotificationRequest } from "../entities/schemas/create.schema";
import { NotificationStatus } from "../types";

export interface CreateNotificationUseCase {
  execute(data: CreateNotificationRequest): Promise<NotificationStatus>;
}