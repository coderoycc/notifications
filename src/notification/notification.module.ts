import { Module } from '@nestjs/common';
import { CreateNotificationUseCaseImpl } from '@noti-app/use-cases/create-notification.use-case';
import { NotificationEmailCreateController } from '@noti-infra/http/controllers/notification-email.controller';
import { NotificationTypeOrmRepository, NOTIFICATION_TYPEORM_REPO } from '@noti-infra/orm/notification-typeorm.repository';

@Module({
  imports: [],
  controllers: [
    NotificationEmailCreateController
  ],
  providers: [
    CreateNotificationUseCaseImpl,
    {
      provide: NOTIFICATION_TYPEORM_REPO,
      useClass: NotificationTypeOrmRepository,
    }
  ],
  exports: [],
})
export class NotificationModule {}