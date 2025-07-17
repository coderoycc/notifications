import { Tenant } from '../entities/tenant';

export abstract class GetTenantByCodePort {
  abstract execute(code: string): Promise<Tenant | null>;
}
