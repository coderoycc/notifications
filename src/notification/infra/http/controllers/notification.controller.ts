import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';

@Controller('notifications')
export class NotificationController {

  constructor(
    private readonly getterNotificationService: any 
  ) {}
  
  @Get('by-target')
  getAllByTarget(@Query('target') target: string) {
    return [];
  }

  @Get('by-sender')
  findOne(@Param('sender') id: string) {
    // Lógica para obtener una notificación por ID
    return { id };
  }

  @Post()
  create(@Body() createNotificationDto: any) {
    // Lógica para crear una nueva notificación
    return createNotificationDto;
  }
}