import { Module } from '@nestjs/common';
import { GetTenantFromFileUseCase } from './app/use-cases/get-from-file.use-case';
import { GetTenantFromFileAdapter, LoadDataFileTK } from './infra/external/get-from-file.adapter';

@Module({
  providers: [
    {
      provide: LoadDataFileTK,
      useClass: GetTenantFromFileAdapter,
    },
    GetTenantFromFileUseCase,
  ],
  exports: [LoadDataFileTK],
})
export class TenantModule {}
