import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Query,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { NotificationEmailMapper } from '../mappers/notification-email.mapper';
import { CreateNotificationUseCaseImpl } from '@noti-app/use-cases/create-notification.use-case';
import moment from 'moment';
import { ResponseInterceptor } from 'src/shared/infra/interceptors/response.interceptors';
import { HttpExceptionFilter } from 'src/shared/infra/filters/http-exception.filter';
import { CreateNotificationEmailDto } from '../dtos/create-email-notification.dto';
import { ApiStandardResponse } from 'src/shared/infra/decorators/api-response.decorator';
import { NotificationMapper } from '../mappers/notification.mapper';
import { NotificationDto } from '../dtos/notification.dto';
import { apiErrorHandler } from 'src/shared/infra/handlers/api-error.handler';
import { isValidTimezone } from 'src/shared/utils/date-management.util';
import { SendEmailNotificationUseCase } from '@noti-app/use-cases/send-email-notification.use-case';

@Controller('notifications')
@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
export class NotificationEmailCreateController {
  constructor(
    private readonly notificationCreateService: CreateNotificationUseCaseImpl,
    private readonly notificationSender: SendEmailNotificationUseCase,
  ) {}

  @Post('send-email')
  @ApiStandardResponse(NotificationDto, 201, 'Save notification email')
  async createNotification(
    @Body() createNotificationDto: CreateNotificationEmailDto,
  ): Promise<NotificationDto> {
    try {
      if (
        createNotificationDto.timezone &&
        !isValidTimezone(createNotificationDto.timezone)
      )
        throw new HttpException('Invalid timezone', HttpStatus.BAD_REQUEST);

      const dataToCreate = NotificationEmailMapper.toCreateRequest(
        createNotificationDto,
      );
      const notiResp =
        await this.notificationCreateService.execute(dataToCreate);
      
      const senResp = await this.notificationSender.execute(notiResp);
       
      return NotificationMapper.toNotificationDto(notiResp);
    } catch (error) {
      throw apiErrorHandler(error);
    }
  }

  @Post('schedule-email')
  @ApiStandardResponse(NotificationDto, 201, 'Schedule notification email')
  async scheduleNotification(
    @Body() createNotificationDto: CreateNotificationEmailDto,
  ): Promise<NotificationDto> {
    try {
      if (
        !moment(
          createNotificationDto.scheduledAt,
          'YYYY-MM-DD HH:mm:ss',
          true,
        ).isValid() ||
        moment(createNotificationDto.scheduledAt).isBefore(moment.now())
      )
        throw new HttpException(
          'Scheduled date is not valid',
          HttpStatus.BAD_REQUEST,
        );

      if (!createNotificationDto.scheduledAt)
        throw new HttpException(
          'Scheduled date is required',
          HttpStatus.BAD_REQUEST,
        );

      if (
        createNotificationDto.timezone &&
        !isValidTimezone(createNotificationDto.timezone)
      )
        throw new HttpException('Invalid timezone', HttpStatus.BAD_REQUEST);

      const dataToCreate = NotificationEmailMapper.toCreateRequestWithSchedule(
        createNotificationDto as Required<CreateNotificationEmailDto>,
      );
      const notiResp =
        await this.notificationCreateService.execute(dataToCreate);
      return NotificationMapper.toNotificationDto(notiResp);
    } catch (error) {
      throw apiErrorHandler(error);
    }
  }
}

