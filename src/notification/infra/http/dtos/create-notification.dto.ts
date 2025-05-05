export class CreateNotificationDto {
  title: string;
  message: string;
  scheduled: boolean;
  scheduledAt?: Date;
  type?: string;
  target: string;
  createdBy: string;
}