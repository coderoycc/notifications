export class TargetNotFoundException extends Error {
  constructor(targetId?: number) {
    super(`Target ${targetId || ''} not found`);
    this.name = 'TargetNotFoundException';
  }
}

export class TargetExistsException extends Error {
  constructor(targetId?: number) {
    super(`Target ${targetId || ''} already exists`);
    this.name = 'TargetExistsException';
  }
}

export class TargetDataException extends Error {
  constructor(message: string) {
    super(`Target data error: ${message}`);
    this.name = 'TargetDataException';
  }
}
