import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MiModuleModule } from './mi-module/mi-module.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [MiModuleModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
