import { IsString, IsOptional, IsDate, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateNotificationDto {
  @IsString({ message: 'Notification must be string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsOptional()
  message: string;

  @IsOptional()
  @IsDateString()
  scheduledAt?: Date;

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}