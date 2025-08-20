import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SharedModule,
    NotificationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    })
  ],
  providers: [],
})
export class AppModule { }
