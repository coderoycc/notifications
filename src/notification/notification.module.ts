import { Module } from '@nestjs/common';
import { NotificationGetService } from '@noti-app/services/notification-get.service';
import { CreateNotificationUseCaseImpl } from '@noti-app/use-cases/create-notification.use-case';
import { SendEmailNotificationUseCase } from '@noti-app/use-cases/send-email-notification.use-case';
import { NotificationEmailCreateController } from '@noti-infra/http/controllers/notification-email.controller';
import { NotificationController } from '@noti-infra/http/controllers/notification.controller';
import {
  NotificationTypeOrmRepository,
  NOTIFICATION_REPOSITORY,
} from '@noti-infra/orm/repository/notification-typeorm.repository';
import { EmailSenderAdapter } from '@noti-infra/senders/email-sender.adapter';
import { EMAIL_SENDER_TK, EMAIL_SERVICE_TK } from '@noti-infra/senders/tokens.senders';
import { MailjetService } from '@noti-infra/services/mailjet.service';
// import { NodemailerEmailService } from '@noti-infra/services/nodemailer.service';

@Module({
  imports: [],
  providers: [
    {
      provide: NOTIFICATION_REPOSITORY,
      useClass: NotificationTypeOrmRepository,
    },
    CreateNotificationUseCaseImpl,
    NotificationGetService,
    {
      provide: EMAIL_SENDER_TK,
      useClass: EmailSenderAdapter,
    },
    {
      provide: EMAIL_SERVICE_TK,
      // useClass: NodemailerEmailService,
      useClass: MailjetService,
    },
    SendEmailNotificationUseCase,
  ],
  controllers: [NotificationController, NotificationEmailCreateController],
  exports: [],
})
export class NotificationModule {}

