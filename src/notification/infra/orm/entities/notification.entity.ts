import { NotificationType } from "@noti-domain/entities/schemas";
import { NotificationStatus } from "@noti-domain/entities/schemas";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from "typeorm";

@Entity('notifications')
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  message: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'boolean', default: false })
  scheduled: boolean;

  @Column({ type: 'timestamp', nullable: true })
  scheduledAt: Date;

  @Column({ type: 'enum', default: 'pendiente' })
  status: NotificationStatus;

  @Column({ type: 'enum', nullable: true })
  type: NotificationType;

  @Column({ type: 'varchar', length: 255 })
  @Index('idx_notification_target')
  target: string;

  @Column({ type: 'varchar', length: 64 })
  createdBy: string;
}