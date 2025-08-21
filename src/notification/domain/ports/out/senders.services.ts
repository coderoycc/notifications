import { Notification } from "@noti-domain/entities/notification.entity";

export interface EmailService {
  sendEmail(notification: Notification): Promise<void>;
}

export interface SmsService {
  sendSms(params: {}): Promise<void>;
}

export interface PopUpService {
  sendPopUp(params: {}): Promise<void>;
}