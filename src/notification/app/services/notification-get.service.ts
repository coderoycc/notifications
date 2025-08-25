import { Inject, Injectable } from "@nestjs/common";
import { Notification } from "@noti-domain/entities/notification.entity";
import { FindNotificationService, Paginate, NotificationRepository } from "@noti-domain/ports";
import { NOTIFICATION_REPOSITORY } from "@noti-domain/tokens";

@Injectable()
export class NotificationGetService implements FindNotificationService {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepository: NotificationRepository,
){}
  findAllByTarget(target: string): Promise<Notification[]> {
    return this.notificationRepository.findAllByTarget(target);
  }
  findAllByUserId(userId: string): Promise<Notification[]> {
    return this.notificationRepository.findByUserId(userId);
  }
  listFilters(filter: Partial<Notification>, pagination: Paginate): Promise<{ data: Notification[]; totalRows: number; }> {
    return this.notificationRepository.listFilters(filter, pagination);
  }
}