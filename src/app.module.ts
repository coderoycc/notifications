import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    SharedModule,
    NotificationModule,
  ],
  providers: [],
})
export class AppModule { }
