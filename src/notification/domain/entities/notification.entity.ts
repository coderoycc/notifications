import { NotificationProps, NotificationStatus, NotificationType } from "./schemas";

export class Notification {
  id?: string;
  title: string;
  message: string;
  createdAt?: Date;
  scheduled: boolean;
  scheduledAt?: Date;
  status?: NotificationStatus;
  type?: NotificationType;
  target: string;
  createdBy?: string;
  timezone?: string;


  loadFromPersistence(
    data: NotificationProps
  ){
    this.id = data.id;
    this.title = data.title;
    this.message = data.message;
    this.createdAt = data.createdAt;
    this.scheduled = data.scheduled;
    this.scheduledAt = data.scheduledAt;
    this.status = data.status;
    this.type = data.type;
    this.target = data.target;
    this.createdBy = data.createdBy;
  }


  toRaw(): {
    id?: string;
    title: string;
    message: string;
    createdAt?: Date;
    scheduled: boolean;
    scheduledAt?: Date;
    status?: NotificationStatus;
    type?: NotificationType;
    target: string;
    createdBy?: string;
  } {
    return {
      id: this.id,
      title: this.title,
      message: this.message,
      createdAt: this.createdAt,
      scheduled: this.scheduled,
      scheduledAt: this.scheduledAt,
      status: this.status,
      type: this.type,
      target: this.target,
      createdBy: this.createdBy
    };
  }
}
