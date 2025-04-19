export class NotificationNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotificationNotFoundException';
    this.cause = message;
  }
}

export class NotificationNotSent extends Error {
  constructor() {
    const message = 'Notification not sent, check your configuration';
    super(message);
    this.name = 'NotificationNotSent';
    this.cause = message;
  }
}
