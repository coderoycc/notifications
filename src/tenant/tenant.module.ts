import { Get, Module } from '@nestjs/common';
import { GetTenantFromFileUseCase } from './app/use-cases/get-from-file.use-case';
import { GetTenantFromFileAdapter } from './infra/external/get-from-file.adapter';
import { LOAD_TENANT_DATA_TK } from './domain/tokes';

@Module({
  providers: [
    {
      provide: LOAD_TENANT_DATA_TK,
      useClass: GetTenantFromFileAdapter,
    },
    GetTenantFromFileUseCase,
  ],
  exports: [GetTenantFromFileUseCase],
})
export class TenantModule {}
