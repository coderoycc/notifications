import { Target } from "@target/domain/entities/target";
import { Template } from "@template/domain/entities/template";
import { NotificationStatus } from "./status.enum";

export abstract class Notification {
  id?: string;
  target: Target;
  title: string;
  message: string;
  dateToSend: Date;
  scheduled: boolean;
  type: string;
  status: NotificationStatus;
  createdAt: Date;
  template: Template | null;
}

export interface NotificationSender {
  beforeSend(notification: Notification): Promise<void>;
  send(notification: Notification): Promise<NotificationStatus>;
  afterSend(notification: Notification): Promise<void>;
}
