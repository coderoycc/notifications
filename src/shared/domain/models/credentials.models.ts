export interface TenantCredentials {
  smtpHost: string;
  smtpUser: string;
  smtpPass: string;
  emailAddress: string;
  name: string;
  sign?: string;
}
