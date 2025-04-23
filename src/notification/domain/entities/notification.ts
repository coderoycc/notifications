import { Target } from "@target/domain/entities/target";
import { Template } from "@template/domain/entities/template";
import { NotificationStatus } from "./status.enum";

export class Notification {
  id: string;
  target: Target;
  title: string;
  message: string;
  dateToSend: Date;
  scheduled: boolean;
  type: string;
  status: NotificationStatus;
  createdAt: Date;
  template: Template | null;

  constructor() { }
  validate(): boolean {
    if (!this.target) {
      throw new Error("Target is required");
    }
    if (!this.title) {
      throw new Error("Title is required");
    }
    if (!this.message) {
      throw new Error("Message is required");
    }
    if (this.scheduled && !this.dateToSend) {
      throw new Error("Date to send is required when scheduled");
    }
    return true;
  }
}
