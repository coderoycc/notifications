import { Controller, Get, Query, HttpException, UseInterceptors, UseFilters } from '@nestjs/common';
import { NotificationGetService } from '@noti-app/services/notification-get.service';
import { Notification } from '@noti-domain/entities/notification.entity';
import { ApiPaginatedResponse, ApiStandardResponse } from 'src/shared/infra/decorators/api-response.decorator';
import { HttpExceptionFilter } from 'src/shared/infra/filters/http-exception.filter';
import { ResponseInterceptor } from 'src/shared/infra/interceptors/response.interceptors';
import { NotificationDto } from '../dtos/notification.dto';
import { NotificationMapper } from '../mappers/notification.mapper';
import { AdvancedFilterDto } from '../dtos/filters.dto';
import { ResponseBuilder } from 'src/shared/infra/builders/response.builder';
import { PaginatedResponse } from 'src/shared/interfaces/api.response.interface';
import { isValidTimezone } from '@shared-utils/date-management.util';

@Controller('notifications')
@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
export class NotificationController {

  constructor(
    private readonly getService: NotificationGetService 
  ) {}
  
  @Get('by-target')
  @ApiStandardResponse(NotificationDto, 200, 'Lista de notificationes por target', true)
  async getAllByTarget(@Query('target') target: string): Promise<NotificationDto[]> {
    if(!target) {
      throw new HttpException(
        { success: false, message: 'Target is required' },
        400,
      )
    }
    const data = await this.getService.findAllByTarget(target);
    if(data.length === 0)
      throw new HttpException({
        message: `Notifications not found for target: ${target}`,
      }, 404)
    
    return data.map(NotificationMapper.toNotificationDto);
  }

  @Get('by-sender')
  @ApiStandardResponse(NotificationDto, 200, 'Lista de notrficationes por usuariotarget', true)
  async findOne(@Query('sender') id: string): Promise<NotificationDto[]> {
    if (!id){
      throw new HttpException(
        { success: false, message: 'Sender is required', field: 'sender' },
        400,
      );
    }
    const data = await this.getService.findAllByUserId(id);  
    if(data.length === 0)
      throw new HttpException({
        message: `Notifications not found for sender: ${id}`,
      }, 404)
    return data.map(NotificationMapper.toNotificationDto)
  }

  @Get('filtered')
  @ApiPaginatedResponse(NotificationDto)
  async getFilteredList(@Query() filters: AdvancedFilterDto): Promise<PaginatedResponse<NotificationDto>> {
    const {
      page = 1,
      limit = 10,
      ...dataFilter
    } = filters ?? {};

    if (dataFilter.timezone && !isValidTimezone(dataFilter.timezone))
      throw new HttpException(
        { success: false, message: 'Invalid timezone format' },
        400,
      );

    const { data, totalRows } = await this.getService.listFilters({
      createdAt: dataFilter.startCreatedDate,
      target: dataFilter.target,
      createdBy: dataFilter.sender,
      status: dataFilter.status,
      scheduled: !!dataFilter.scheduled,
      timezone: dataFilter.timezone || 'UTC',
    }, { page, limit });

    return ResponseBuilder.paginated<NotificationDto>(
      data.map(NotificationMapper.toNotificationDto), 
      totalRows, 
      page, 
      limit
    );
  }
}