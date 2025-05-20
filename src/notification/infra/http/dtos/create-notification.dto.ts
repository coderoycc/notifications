import { IsString, IsOptional, IsDate, IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @IsString({ message: 'Notification ID must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsOptional()
  message: string;

  @IsOptional()
  @IsDate()
  scheduledAt?: Date;

  @IsString()
  @IsNotEmpty()
  target: string;

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}