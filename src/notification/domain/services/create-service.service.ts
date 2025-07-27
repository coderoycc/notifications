import { NotificationRepository } from "@noti-domain/ports/out/notification.repository";

export class CreateNotificationService {
  constructor(private readonly notificationRepository: NotificationRepository) { }

}