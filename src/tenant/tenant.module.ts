import { Module } from '@nestjs/common';
import { GetTenantFromFileUseCase } from './app/use-cases/get-from-file.use-case';
import { GetTenantFromFileAdapter } from './infra/external/get-from-file.adapter';

@Module({
  providers: [
    {
      provide: 'GetTenantByCodePort',
      useClass: GetTenantFromFileUseCase,
    },
    {
      provide: 'LoadTenantDataPort',
      useClass: GetTenantFromFileAdapter,
    },
  ],
  exports: ['GetTenantByCodePort'],
})
export class TenantModule {}
