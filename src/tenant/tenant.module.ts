import { Module } from '@nestjs/common';
import { GetTenantFromFileUseCase } from './app/use-cases/get-from-file.use-case';
import { GetTenantFromFileAdapter } from './infra/external/get-from-file.adapter';
import { LoadTenantDataPort } from './domain/outbound-ports/load-tenant-data';

@Module({
  providers: [
    {
      provide: 'TenantFromFile' ,
      useClass: GetTenantFromFileAdapter,
    },
    GetTenantFromFileUseCase,
  ],
  exports: ['TenantFromFile'],
})
export class TenantModule {}
