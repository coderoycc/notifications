import { TenantCredentials } from '../models/credentials.models';

export interface CredentialLoadData {
  loadCredentials(tenant: string): Promise<TenantCredentials | null>;
}
