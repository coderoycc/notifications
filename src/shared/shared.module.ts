import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigOptions } from "./config/orm/typeorm.config";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: ConfigOptions,
    })
  ],
  providers: [],
  exports: [
    ConfigModule,
    TypeOrmModule,
  ],
})
export class SharedModule {}
