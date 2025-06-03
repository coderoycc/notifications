import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { CreateNotificationDto } from "./create-notification.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNotificationEmailDto extends CreateNotificationDto {
  @ApiProperty({
    description: 'Email address of the recipient',
    example: 'an-email.test@mail.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  target: string;
}