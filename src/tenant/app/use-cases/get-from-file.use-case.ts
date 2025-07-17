import { Injectable } from '@nestjs/common';
import { Tenant } from 'src/tenant/domain/entities/tenant';
import { GetTenantByCodePort } from 'src/tenant/domain/inbound-ports/get-tenant.port';
import { LoadTenantDataPort } from 'src/tenant/domain/outbound-ports/load-tenant-data';

@Injectable()
export class GetTenantFromFileUseCase implements GetTenantByCodePort {
  constructor(private readonly loader: LoadTenantDataPort) {}
  async execute(code: string): Promise<Tenant | null> {
    return this.loader.load(code);
  }
}
