import { Target } from "src/target/domain/entities/target";

export interface NotificationRepository {
  findById(id: string): Promise<Notification | null>;
  getTargetById(targetId: string): Promise<Target | null>;
  getTemplateById(templateId: string): Promise<any>;
}
