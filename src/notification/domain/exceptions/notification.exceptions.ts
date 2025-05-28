import { ExceptionCodes } from "./exception-codes";

export class NotificationError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.code = code;
  }
}

export class NotificationNotFoundException extends NotificationError {
  constructor(notificationId: string) {
    super(`Notification with ID ${notificationId} not found`, ExceptionCodes.NOT_FOUND);
    this.name = 'NotificationNotFoundException';
  }
}

export class NotificationTargetNotValidException extends NotificationError {
  constructor(target: string) {
    super(`Notification target ${target} is not valid`, ExceptionCodes.VALIDATION_ERROR);
    this.name = 'NotificationTargetNotValidException';
  }
}

export class NotificationNotPermissionsException extends NotificationError {
  constructor() {
    super('You do not have permission to perform this action', ExceptionCodes.PERMISSION_DENIED);
    this.name = 'NotificationNotPermissionsException';
  }
}

export class SenderQuotaExceededException extends NotificationError {
  constructor(sender: string, quota: number) {
    super(`Sender ${sender} has exceeded the quota of ${quota} notifications`, ExceptionCodes.RESOURCE_EXHAUSTED);
    this.name = 'SenderQuotaExceededException';
  }
}

export class SenderNotValidException extends NotificationError {
  constructor(sender: string) {
    super(`Sender ${sender} is not valid`, ExceptionCodes.VALIDATION_ERROR);
    this.name = 'SenderNotValidException';
  }
}