import {
  NotificationType,
  NotificationStatus,
} from '@noti-domain/entities/notification.enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('notifications')
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  message: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'boolean', default: false })
  scheduled: boolean;

  @Column({ type: 'timestamp', nullable: true })
  scheduledAt: Date;

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.PENDING,
  })
  status: NotificationStatus;

  @Column({ type: 'enum', enum: NotificationType, nullable: true })
  type: NotificationType;

  @Index('idx_notification_target', { fulltext: true })
  @Column({ type: 'varchar', length: 255 })
  target: string;

  @Column({ type: 'varchar', length: 64 })
  createdBy: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  timezone?: string;
}

