import { Notification } from '@noti-domain/entities/notification.entity';

export interface Paginate {
  page: number;
  limit: number;
}
export interface FindNotificationService {
  findAllByUserId(userId: string): Promise<Notification[]>;
  findAllByTarget(target: string): Promise<Notification[]>;
  listFilters(
    filter: Partial<Notification>,
    pagination: Paginate,
  ): Promise<{ data: Notification[]; totalRows: number }>;
}
