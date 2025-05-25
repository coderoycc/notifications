import { Controller, Get, Query, HttpException, UseInterceptors, UseFilters } from '@nestjs/common';
import { NotificationGetService } from '@noti-app/services/notification-get.service';
import { Notification } from '@noti-domain/entities/notification.entity';
import { ApiStandardResponse } from 'src/shared/infra/decorators/api-response.decorator';
import { HttpExceptionFilter } from 'src/shared/infra/filters/http-exception.filter';
import { ResponseInterceptor } from 'src/shared/infra/interceptors/response.interceptors';

@Controller('notifications')
@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
export class NotificationController {

  constructor(
    private readonly getService: NotificationGetService 
  ) {}
  
  @Get('by-target')
  // @ApiStandardResponse(Object, 200, 'Lista de notificationes por target', true)
  getAllByTarget(@Query('target') target: string): Promise<Notification[]> {
    if(!target) {
      throw new HttpException(
        { success: false, message: 'Target is required' },
        400,
      )
    }
    return this.getService.findAllByTarget(target);
  }

  @Get('by-sender')
  @ApiStandardResponse(Notification, 200, 'Lista de notificationes por target', true)
  findOne(@Query('sender') id: string) {
    if (!id){
      throw new HttpException(
        { success: false, message: 'Sender is required', field: 'sender' },
        400,
      );
    }
    return this.getService.findAllByUserId(id);  
  }
}