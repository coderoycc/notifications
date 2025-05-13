export class CreateSmsDto {
  phoneNumber: string;
  message: string;
  senderId: string;
  scheduleDate?: Date;
  status: string;
}