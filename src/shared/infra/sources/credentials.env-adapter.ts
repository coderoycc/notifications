import { TenantCredentials } from 'src/shared/domain/models/credentials.models';
import { CredentialLoadData } from 'src/shared/domain/outbound-ports/credential.port';

export class EnvTenantCredentialsAdapter implements CredentialLoadData {
  async loadCredentials(tenantId: string): Promise<TenantCredentials> {
    return {
      smtpHost: process.env[`TENANT_${tenantId}_SMTP_HOST`] ?? '',
      smtpUser: process.env[`TENANT_${tenantId}_SMTP_USER`] ?? '',
      smtpPass: process.env[`TENANT_${tenantId}_SMTP_PASS`] ?? '',
      emailAddress: process.env[`TENANT_${tenantId}_EMAIL`] ?? '',
      name: process.env[`TENANT_${tenantId}_NAME`] ?? '',
      sign: process.env[`TENANT_${tenantId}_SIGN`],
    };
  }
}
