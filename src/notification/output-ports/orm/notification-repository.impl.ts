import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificationRepositoryImpl implements NotificationRepository {
  constructor(
    @InjectRepository(NotificationEntity) // Ejemplo con TypeORM
    private readonly ormRepo: Repository<NotificationEntity>,
  ) {}

  async save(notification: Notification): Promise<Notification> {
    const saved = await this.ormRepo.save(notification);
    return new Notification(
      saved.id,
      saved.target,
      saved.title,
      saved.message,
      saved.type,
      saved.status,
      saved.scheduled,
      saved.dateToSend,
      saved.createdAt,
    );
  }

  // ... otros métodos (findById, etc.)
}