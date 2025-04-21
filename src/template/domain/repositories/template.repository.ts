import { Template } from "../entities/template";

export interface TemplateRepository {
  getTemplateById(id: string): Promise<Template | null>;
}
