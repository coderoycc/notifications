import { Controller, Post, Body, HttpException, HttpStatus, Get, Query } from '@nestjs/common';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { NotificationEmailMapper } from '../mappers/notification-email.mapper';
import { CreateNotificationUseCaseImpl } from '@noti-app/use-cases/create-notification.use-case';
import moment from 'moment';

@Controller('notifications')
export class NotificationEmailCreateController {
  constructor(private readonly notificationCreateService: CreateNotificationUseCaseImpl) {}

  @Post('send-email')
  async createNotification(@Body() createNotificationDto: CreateNotificationDto) {
    try {
      const dataToCreate = NotificationEmailMapper.toCreateRequest(createNotificationDto);
      const notificationStatus = await this.notificationCreateService.execute(dataToCreate);
      return { success: true, status: notificationStatus }
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
      if (
        !moment(createNotificationDto.scheduledAt, 'YYYY-MM-DD HH:mm:ss').isValid()
        || moment(createNotificationDto.scheduledAt).isBefore(moment.now())
      ) {
        throw new Error('Scheduled date is not valid');
      }
      const dataToCreate = NotificationEmailMapper.toCreateRequestWithSchedule(createNotificationDto);
      const notification = await this.notificationCreateService.execute(dataToCreate);
      return { success: true, data: notification };
    } catch (error) {
      throw new HttpException(
        { success: false, message: error.message || 'Unknown request error' },
        HttpStatus.BAD_REQUEST,
      )
    } 
  }
}