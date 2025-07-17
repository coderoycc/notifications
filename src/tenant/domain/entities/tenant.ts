export class Tenant {
  constructor(
    public readonly code: string,
    public readonly name: string,
    public readonly email: string,
    public readonly description: string,
    public readonly pass: string,
  ) {
    this.code = code;
    this.name = name;
    this.email = email;
    this.description = description;
    this.pass = pass;
  }
}
