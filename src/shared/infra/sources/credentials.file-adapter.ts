import { TenantCredentials } from 'src/shared/domain/models/credentials.models';
import { CredentialLoadData } from 'src/shared/domain/outbound-ports/credential.port';
import * as fs from 'fs/promises';
import * as path from 'path';

export class JsonTenantCredentialsAdapter implements CredentialLoadData {
  private readonly credentialsPath = path.resolve(
    __dirname,
    '../../../secrets/tenants.json',
  );

  async loadCredentials(tenantId: string): Promise<TenantCredentials> {
    const content = await fs.readFile(this.credentialsPath, 'utf8');
    const all = JSON.parse(content);
    return all[tenantId];
  }
}
