import { ApiProperty } from "@nestjs/swagger";
import { NotificationStatus } from "@noti-domain/entities/schemas";
import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class AdvancedFilterDto {
  @ApiProperty({
    description: 'Filter by target',
    required: false,
  })
  @IsOptional()
  target?: string;

  @ApiProperty({
    description: 'Filter by sender',
    required: false,
  })
  @IsOptional()
  sender?: string;

  @ApiProperty({
    description: 'Filter by date range',
    required: false,
    type: Date,
  })
  @IsOptional()
  startCreatedDate?: Date;

  @ApiProperty({
    description: 'Notifications status',
    required: false,
    enum: NotificationStatus,
    enumName: 'NotificationStatus',
  })
  @IsOptional()
  status?: NotificationStatus;

  @ApiProperty({
    description: 'Notifications scheduled',
    required: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  scheduled?: boolean;

  @ApiProperty({
    description: 'Pagination options',
    required: false,
    type: Object,
  })
  @IsOptional()
  pagination?: {
    page: number;
    limit: number;
  };
}