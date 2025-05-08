import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { CreateNotificationUseCase } from '@noti-domain/inbound-ports/create-notification.use-case';
import { NotificationEmailMapper } from '../mappers/notification-email.mapper';

@Controller('notification')
export class NotificationEmailCreateController {
  constructor(private readonly notificationCreateService: CreateNotificationUseCase) {}

  @Post('send-email')
  async createNotification(@Body() createNotificationDto: CreateNotificationDto) {
    try {
      const dataToCreate = NotificationEmailMapper.toCreateRequest(createNotificationDto);
      const notification = await this.notificationCreateService.execute(dataToCreate);
      return { success: true, data: notification };
    } catch (error) {
      throw new HttpException(
        { success: false, message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('schedule-email')
  async scheduleNotification(@Body() createNotificationDto: Required<CreateNotificationDto>) {
    try {
      const dataToCreate = NotificationEmailMapper.toCreateRequestWithSchedule(createNotificationDto);
      const notification = await this.notificationCreateService.execute(dataToCreate);
      return { success: true, data: notification };
    } catch (error) {
      throw new HttpException(
        { success: false, message: error.message },
        HttpStatus.BAD_REQUEST,
      )
    } 
  }
}