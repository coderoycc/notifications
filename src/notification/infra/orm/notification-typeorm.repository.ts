import { NotificationRepository } from "@noti-domain/outbound-ports/notification.repository";

export const NOTIFICATION_REPOSITORY = Symbol('NotificationTypeOrmRepository');
export class NotificationTypeOrmRepository implements NotificationRepository {

}