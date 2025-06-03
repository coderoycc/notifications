import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NotificationEntity } from '@noti-infra/orm/entities/notification.entity';

export const ConfigOptions = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [NotificationEntity],
  synchronize: configService.get('DB_SYNC') === 'true',
  logging: ['error', 'warn', 'info', 'query', 'schema'],
  ssl: configService.get('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
  migrationsRun: false, 
}) 