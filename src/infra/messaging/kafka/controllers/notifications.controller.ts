import { SendNotification } from "@app/useCases/sendNotification";
import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

interface SendNotificationPayload {
  content: string;
  category: string;
  recipientId: string;
}

@Controller()
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @EventPattern("notifications.send-notifications")
  async handleSendNotification(
    @Payload() { content, category, recipientId }: SendNotificationPayload
  ) {
    await this.sendNotification.execute({
      content,
      category,
      recipientId
    });
  }
}
