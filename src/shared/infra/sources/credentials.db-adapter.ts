import { TenantCredentials } from 'src/shared/domain/models/credentials.models';
import { CredentialLoadData } from 'src/shared/domain/outbound-ports/credential.port';

export class DbCredentialsTenantAdapter implements CredentialLoadData {
  constructor() {}
  loadCredentials(tenant: string): Promise<TenantCredentials> {
    // Implements loadCredentials
    return Promise.resolve({} as TenantCredentials);
  }
}
