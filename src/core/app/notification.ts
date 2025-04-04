export interface Notification {
  send(): Promise<number>;
  useTemplate(templateId: string): Promise<Notification>;
}
