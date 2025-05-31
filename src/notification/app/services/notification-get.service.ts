import { Inject, Injectable } from "@nestjs/common";
import { Notification } from "@noti-domain/entities/notification.entity";
import { NotificationType } from "@noti-domain/entities/schemas";
import { FindNotificationService, Paginate } from "@noti-domain/inbound-ports/find-notification.service";
import { NotificationRepository } from "@noti-domain/outbound-ports/notification.repository";
import { NOTIFICATION_REPOSITORY } from "@noti-infra/orm/repository/notification-typeorm.repository";

@Injectable()
export class NotificationGetService implements FindNotificationService {

  constructor(
    @Inject(NOTIFICATION_REPOSITORY) private readonly notyRepo: NotificationRepository
  ){}

  listFilters(filter: Partial<Notification>, pagination: Paginate): Promise<{ data: Notification[], totalRows: number }> {
    return this.notyRepo.listFilters(filter, pagination);
  }

  findAllByTarget(target: string): Promise<Notification[]> {
    return this.notyRepo.findAllByTarget(target);
  }

  findAllByType(type: NotificationType): Promise<Notification[]> {
    throw new Error("Method not implemented.");
  }

  findAllByUserId(userId: string): Promise<Notification[]> {
    return this.notyRepo.findByUserId(userId);
  }
}