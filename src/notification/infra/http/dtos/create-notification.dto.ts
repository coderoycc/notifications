import { NotificationType } from "@noti-domain/entities/schemas";
import { Type } from "class-transformer";
import { IsString, IsBoolean, IsOptional, IsEnum, IsDate, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @IsString({ message: 'Notification ID must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsOptional()
  message: string;

  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  scheduled: boolean;

  @IsOptional()
  @IsDate()
  scheduledAt?: Date;

  @IsEnum(NotificationType, { message: 'Invalid notification type' })
  @IsNotEmpty()
  type: NotificationType;

  @IsString()
  @IsNotEmpty()
  target: string;

  @IsString()
  createdBy: string;
}