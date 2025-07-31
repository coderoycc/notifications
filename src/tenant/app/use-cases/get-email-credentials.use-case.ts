import { Inject, Injectable } from '@nestjs/common';
import { Tenant } from 'src/tenant/domain/entities/tenant';
import { GetTenantByCodePort } from 'src/tenant/domain/inbound-ports/get-tenant.port';
import { LoadTenantDataPort } from 'src/tenant/domain/outbound-ports/load-tenant-data';
import { LoadDataFileTK } from 'src/tenant/infra/external/get-from-file.adapter';

@Injectable()
export class GetTenantFromFileUseCase implements GetTenantByCodePort {
  constructor(@Inject(LoadDataFileTK) private readonly loader: LoadTenantDataPort) {}
  async execute(code: string): Promise<Tenant | null> {
    return this.loader.load(code);
  }
}
