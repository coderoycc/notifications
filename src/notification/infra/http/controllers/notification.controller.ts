import { Controller, Get, Post, Body, Param, Query, HttpException } from '@nestjs/common';
import { NotificationGetService } from '@noti-app/services/notification-get.service';

@Controller('notifications')
export class NotificationController {

  constructor(
    private readonly getService: NotificationGetService 
  ) {}
  
  @Get('by-target')
  getAllByTarget(@Query('target') target: string) {
    if(!target) {
      throw new HttpException(
        { success: false, message: 'Target is required' },
        400,
      )
    }
    return this.getService.findAllByTarget(target);
  }

  @Get('by-sender')
  findOne(@Query('sender') id: string) {
    if (!id){
      throw new HttpException(
        { success: false, message: 'Sender is required' },
        400,
      );
    }
    return this.getService.findAllByUserId(id);  
  }
}