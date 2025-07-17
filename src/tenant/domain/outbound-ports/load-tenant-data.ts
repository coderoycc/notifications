import { Tenant } from '../entities/tenant';

export abstract class LoadTenantDataPort {
  abstract load(code: string): Promise<Tenant | null>;
}
