import { BadRequestException, HttpException } from "@nestjs/common";

 export class NotificationNotFoundException extends Error {
  constructor(notificationId: string) {
    super(`Notification with ID ${notificationId} not found`);
    this.name = 'NotificationNotFoundException';
  }
}

export class NotificationTargetNotValidException extends Error {
  constructor(target: string) {
    super(`Notification target ${target} is not valid`);
    this.name = 'NotificationTargetNotValidException';
  }
}

export class NotificationNotPermissionsException extends HttpException {
  constructor() {
    super('You do not have permission to perform this action', 403);
    this.name = 'NotificationNotPermissionsException';
  }
}

export class SenderQuotaExceededException extends BadRequestException {
  constructor(sender: string, quota: number) {
    super(`Sender ${sender} has exceeded the quota of ${quota} notifications`);
    this.name = 'SenderQuotaExceededException';
  }
}