import { NotificationStatus } from "./status.enum";

export enum NotificationChannel {
  EMAIL = "EMAIL",
  SMS = "SMS",
  PUSH = "PUSH",
  WHATSAPP = "WHATSAPP"
}

export interface NotificationChannelPort {
  send(notification: Notification): Promise<NotificationStatus>;
  
  beforeSend?(notification: Notification): Promise<void>;
  afterSend?(notification: Notification): Promise<void>;
  onError?(notification: Notification, error: Error): Promise<void>;

  supports(channel: NotificationChannel): boolean;
  getChannelType(): NotificationChannel;
  
  validate(notification: Notification): Promise<boolean>;
  
  isAvailable(): Promise<boolean>;
  getStatus(): Promise<{
    isActive: boolean;
    lastCheck: Date;
    errors?: string[];
  }>;

  getRateLimit?(): Promise<{
    limit: number;
    remaining: number;
    resetTime: Date;
  }>;

  configure(config: Record<string, any>): Promise<void>;
}

export abstract class BaseNotificationChannel implements NotificationChannelPort {
  protected channelType: NotificationChannel;
  protected config: Record<string, any> = {};

  constructor(channelType: NotificationChannel) {
    this.channelType = channelType;
  }

  abstract send(notification: Notification): Promise<NotificationStatus>;

  async beforeSend(notification: Notification): Promise<void> {
    // Default implementation - can be overridden
  }

  async afterSend(notification: Notification): Promise<void> {
    // Default implementation - can be overridden
  }

  async onError(notification: Notification, error: Error): Promise<void> {
    // Default implementation - can be overridden
    console.error(`Error sending notification through ${this.channelType}:`, error);
  }

  supports(channel: NotificationChannel): boolean {
    return this.channelType === channel;
  }

  getChannelType(): NotificationChannel {
    return this.channelType;
  }

  async validate(notification: Notification): Promise<boolean> {
    return true; // Base implementation - should be overridden by specific channels
  }

  async isAvailable(): Promise<boolean> {
    return true; // Base implementation - should be overridden by specific channels
  }

  async getStatus(): Promise<{ isActive: boolean; lastCheck: Date; errors?: string[]; }> {
    return {
      isActive: true,
      lastCheck: new Date(),
    };
  }

  async configure(config: Record<string, any>): Promise<void> {
    this.config = {
      ...this.config,
      ...config
    };
  }
}
