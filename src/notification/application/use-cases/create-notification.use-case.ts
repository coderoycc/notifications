// notification/application/use-cases/create-notification.use-case.ts
export class CreateNotificationUseCase {
    constructor(
      private readonly repository: NotificationRepository,
      private readonly sender: NotificationSender, // Inyección del Sender (composición)
    ) {}
  
    async execute(input: {
      target: string;
      title: string;
      message: string;
      type: NotificationChannel;
      scheduled?: boolean;
      dateToSend?: Date;
    }): Promise<Notification> {
      // 1. Crear la entidad (lógica de dominio)
      const notification = new Notification(
        randomUUID(), // ID generado
        input.target,
        input.title,
        input.message,
        input.type,
        'PENDING',
        input.scheduled || false,
        input.dateToSend,
      );
  
      // 2. Persistir en DB
      await this.repository.save(notification);
  
      // 3. Enviar la notificación (si no está programada)
      if (!notification.scheduled) {
        try {
          await this.sender.send(notification);
          notification.markAsSent(); // Actualizar estado
          await this.repository.save(notification); // Guardar cambios
        } catch (error) {
          notification.markAsFailed();
          await this.repository.save(notification);
          throw new Error('Failed to send notification');
        }
      }
  
      return notification;
    }
  }