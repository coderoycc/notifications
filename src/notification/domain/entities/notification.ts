import { Target } from "@target/domain/entities/target";
import { Template } from "@template/domain/entities/template";

export class Notification {
  id: string;
  target: Target;
  message: string;
  dateToSend: Date;
  programable: boolean;
  status: string;
  template: Template;
  constructor() { }
}
