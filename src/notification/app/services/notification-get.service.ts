import { Injectable } from "@nestjs/common";
import { Notification } from "@noti-domain/entities/notification.entity";
import { NotificationStatus, NotificationType } from "@noti-domain/entities/schemas";
import { FindNotificationService } from "@noti-domain/inbound-ports/find-notification.service";

@Injectable()
export class NotificationGetService implements FindNotificationService {

  constructor(){}

  findById(id: string): Promise<Notification | null> {
    throw new Error("Method not implemented.");
  }

  findAllByStatus(status: NotificationStatus): Promise<Notification[]> {
    throw new Error("Method not implemented.");
  }

  findAllByTarget(target: string): Promise<Notification[]> {
    throw new Error("Method not implemented.");
  }

  findAllByType(type: NotificationType): Promise<Notification[]> {
    throw new Error("Method not implemented.");
  }

  findAllByUserId(userId: string): Promise<Notification[]> {
    throw new Error("Method not implemented.");
  }

  listFilters(): Promise<Notification[]> {
    throw new Error("Method not implemented.");
  }
}