import { Controller, Post, Body, HttpException, HttpStatus, Get, Query, UseInterceptors, UseFilters } from '@nestjs/common';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { NotificationEmailMapper } from '../mappers/notification-email.mapper';
import { CreateNotificationUseCaseImpl } from '@noti-app/use-cases/create-notification.use-case';
import moment from 'moment';
import { ResponseInterceptor } from 'src/shared/infra/interceptors/response.interceptors';
import { HttpExceptionFilter } from 'src/shared/infra/filters/http-exception.filter';
import { CreateNotificationEmailDto } from '../dtos/create-email-notification.dto';

@Controller('notifications')
@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
export class NotificationEmailCreateController {
  constructor(private readonly notificationCreateService: CreateNotificationUseCaseImpl) {}

  @Post('send-email')
  async createNotification(@Body() createNotificationDto: CreateNotificationEmailDto) {
    try {
      const dataToCreate = NotificationEmailMapper.toCreateRequest(createNotificationDto);
      return this.notificationCreateService.execute(dataToCreate);
    } catch (error) {
      throw new HttpException(
        { success: false, message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('schedule-email')
  async scheduleNotification(@Body() createNotificationDto: CreateNotificationEmailDto) {
    try {
      if (
        !moment(createNotificationDto.scheduledAt, 'YYYY-MM-DD HH:mm:ss', true).isValid()
        || moment(createNotificationDto.scheduledAt).isBefore(moment.now())
      ) {
        throw new Error('Scheduled date is not valid');
      }

      if(!createNotificationDto.scheduledAt) {
        throw new Error('Scheduled date is required');
      }
      const dataToCreate = NotificationEmailMapper.toCreateRequestWithSchedule(createNotificationDto as Required<CreateNotificationEmailDto>);
      return this.notificationCreateService.execute(dataToCreate);
    } catch (error) {
      throw new HttpException(
        { success: false, message: error.message || 'Unknown request error' },
        HttpStatus.BAD_REQUEST,
      )
    } 
  }
}