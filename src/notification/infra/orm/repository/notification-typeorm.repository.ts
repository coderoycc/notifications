import { NotificationRepository } from "@noti-domain/outbound-ports/notification.repository";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { NotificationEntity } from "../entities/notification.entity";
import { Notification } from "@noti-domain/entities/notification.entity";
import { NotificationMapper } from "../mappers/notification-orm.mapper";

export const NOTIFICATION_REPOSITORY = Symbol('NotificationRepositoryTypeOrm');

export class NotificationTypeOrmRepository implements NotificationRepository {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>
  ) {}

  async create(notification: Partial<Notification>): Promise<Notification> {
    const newNotification = this.notificationRepository.create(notification);
    const notificationSaved = await this.notificationRepository.save(newNotification);
    return NotificationMapper.toDomain(notificationSaved);
  }

  async update(notification: Partial<NotificationEntity>): Promise<Notification> {
    if (!notification.id) 
      throw new Error("Notification ID is required for update.");
    
    await this.notificationRepository.update(notification.id, notification);
    return this.findById(notification.id) as Promise<Notification>;
  }

  async delete(id: string): Promise<void> {
    await this.notificationRepository.delete(id);
  }

  async findById(id: string): Promise<Notification | null> {
    return null;
  }

  async findAllByTarget(target: string): Promise<Notification[]> {
    const notifications = await this.notificationRepository.find({ where: { target } });
    return notifications.map(notification => NotificationMapper.toDomain(notification));
  }

  async findByUserId(userId: string): Promise<Notification[]> {
    const notifications = await this.notificationRepository.find({ where: { createdBy: userId } });
    return notifications.map(NotificationMapper.toDomain);
  }

  async listFilters(filter: Partial<Notification>, pagination: { page: number; limit: number }): Promise<{data: Notification[], totalRows: number}> {
    const { target, createdBy, createdAt, status, scheduled } = filter;
    const { page, limit } = pagination;

    const queryBuilder = this.notificationRepository.createQueryBuilder('notification');

    if (target) {
      queryBuilder.andWhere('notification.target = :target', { target });
    }
    if (createdBy) {
      queryBuilder.andWhere('notification.createdBy = :sender', { sender: createdBy });
    }
    if (createdAt) {
      queryBuilder.andWhere('notification.createdAt >= :startCreatedDate', { startCreatedDate: createdAt });
    }
    if (status) {
      queryBuilder.andWhere('notification.status = :status', { status });
    }
    if (scheduled !== undefined) {
      queryBuilder.andWhere('notification.scheduled = :scheduled', { scheduled });
    }

    queryBuilder.skip((page - 1) * limit).take(limit);

    const [ notifications, totalRows ] = await Promise.all([ queryBuilder.getMany(), queryBuilder.getCount() ]);

    return { 
      data: notifications.map(NotificationMapper.toDomain), 
      totalRows 
    };
  }
}
