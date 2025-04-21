export class NotFoundTemplateException extends Error {
  constructor(templateId: string) {
    super(`Template with ID ${templateId} not found`);
    this.name = 'NotFoundTemplateException';
  }
}

export class TemplateNotPermissionException extends Error {
  constructor() {
    super(`Template not permission`);
    this.name = 'TemplateNotPermissionException';
  }
}
