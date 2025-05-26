import { ApiProperty, ApiSchema } from "@nestjs/swagger";

export class NotificationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  target: string;
}