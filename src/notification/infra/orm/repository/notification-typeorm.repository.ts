import { NotificationRepository } from "@noti-domain/outbound-ports/notification.repository";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { NotificationEntity } from "../entities/notification.entity";

export const NOTIFICATION_REPOSITORY = Symbol('NotificationRepositoryTypeOrm');

export class NotificationTypeOrmRepository implements NotificationRepository {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>
  ) {}

  async create(notification: Partial<NotificationEntity>): Promise<NotificationEntity> {
    const newNotification = this.notificationRepository.create(notification);
    return await this.notificationRepository.save(newNotification);
  }

  async update(notification: Partial<NotificationEntity>): Promise<NotificationEntity> {
    if (!notification.id) 
      throw new Error("Notification ID is required for update.");
    
    await this.notificationRepository.update(notification.id, notification);
    return this.findById(notification.id) as Promise<NotificationEntity>;
  }

  async delete(id: string): Promise<void> {
    await this.notificationRepository.delete(id);
  }

  async findById(id: string): Promise<NotificationEntity | null> {
    return await this.notificationRepository.findOne({ where: { id } }) || null;
  }

  async findAllByTarget(target: string): Promise<NotificationEntity[]> {
    return await this.notificationRepository.find({ where: { target } });
  }

  async findByUserId(userId: string): Promise<NotificationEntity[]> {
    return await this.notificationRepository.find({ where: { id: userId } });
  }
}
