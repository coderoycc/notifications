import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { CreateNotificationDto } from "./create-notification.dto";

export class CreateNotificationEmailDto extends CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  target: string;
}

