export enum CredentialSourceType {
  ENV = 'env',
  DB = 'db',
  JSON = 'json',
}

export const CredentialSourceConfig = {
  activeSource: process.env.CREDENTIAL_SOURCE ?? CredentialSourceType.ENV,
};
