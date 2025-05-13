import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ConfigOptions = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [__dirname + '/../../**/infra/orm/entities/*.entity{.ts,.js}'],
  // synchronize: configService.get('DB_SYNC') === 'true',
  synchronize: true,
  logging: ['error', 'warn', 'info', 'query', 'schema'],
  // logging: configService.get('DB_LOGGING') === 'true',
  ssl: configService.get('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
  migrationsRun: false, 
}) 