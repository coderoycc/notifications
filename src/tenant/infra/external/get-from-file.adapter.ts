import { Injectable } from '@nestjs/common';
import { LoadTenantDataPort } from 'src/tenant/domain/outbound-ports/load-tenant-data';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Tenant } from 'src/tenant/domain/entities/tenant';
@Injectable()
export class GetTenantFromFileAdapter implements LoadTenantDataPort {
  private readonly filePath = path.join(
    __dirname,
    '..',
    '..',
    'config',
    'files',
    'email.credentials.json',
  );
  async load(code: string): Promise<Tenant | null> {
    try {
      const content = await fs.readFile(this.filePath, 'utf-8');
      const tenants = JSON.parse(content) as Tenant[];
      const found = tenants.find((t) => t.code === code);
      return found
        ? new Tenant(
            found.code,
            found.name,
            found.email,
            found.description,
            found.pass,
          )
        : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export const LoadDataFileTK = Symbol('LoadDataFileTK');