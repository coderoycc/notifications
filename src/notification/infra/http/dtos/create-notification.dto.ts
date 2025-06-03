import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'Title of notificatio',
    example: 'some title',
    required: true,
  })
  @IsString({ message: 'Notification must be string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({
    description: 'Body of the notification',
    example: 'user:123',
    required: true,
  })
  @IsString()
  @IsOptional()
  message: string;

  @ApiProperty({
    description: 'Indicates if the notification is scheduled.',
    example: null,
    required: false,
  })
  @IsOptional()
  @IsDateString()
  scheduledAt?: Date;

  @ApiProperty({
    description: 'UserId or identifier of the sender of the notification',
    example: '0xfd2324234234',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  createdBy: string;

  @ApiProperty({
    description: 'Timezone for the notification, e.g., "America/Mexico_City". If not provided, defaults to UTC.',
    example: 'America/Mexico_City',
    required: false,
  })
  @IsString()
  @IsOptional()
  timezone?: string;
}