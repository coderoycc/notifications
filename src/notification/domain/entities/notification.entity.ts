import { NotificationStatus, NotificationType } from "../types";

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

  constructor(
    title: string,
    message: string,
    scheduled: boolean
  ){
    this.title = title;
    this.message = message;
    this.scheduled = scheduled;
  }
}
