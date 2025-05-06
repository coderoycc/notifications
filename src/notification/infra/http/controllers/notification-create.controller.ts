import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CreateNotificationDto } from '../dtos/create-notification.dto';

@Controller('notification')
export class NotificationCreateController {
  constructor(private readonly notificationCreateService: NotificationCreateService) {}

  @Post('create')
  async createNotification(@Body() createNotificationDto: CreateNotificationDto) {
    try {
      const notification = await this.notificationCreateService.create(createNotificationDto);
      return { success: true, data: notification };
    } catch (error) {
      throw new HttpException(
        { success: false, message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}