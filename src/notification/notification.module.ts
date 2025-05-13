import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateNotificationUseCaseImpl } from '@noti-app/use-cases/create-notification.use-case';
import { NotificationEmailCreateController } from '@noti-infra/http/controllers/notification-email.controller';
import { NotificationEntity } from '@noti-infra/orm/entities/notification.entity';
import { NotificationTypeOrmRepository, NOTIFICATION_REPOSITORY } from '@noti-infra/orm/repository/notification-typeorm.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationEntity]),
  ],
  providers: [
    {
      provide: NOTIFICATION_REPOSITORY,
      useClass: NotificationTypeOrmRepository,
    },
    CreateNotificationUseCaseImpl,
  ],
  controllers: [
    NotificationEmailCreateController
  ],
  exports: [],
})
export class NotificationModule {}