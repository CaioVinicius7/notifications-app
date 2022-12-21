import { SendNotification } from "@app/useCases/sendNotification";
import { Controller, Post, Body } from "@nestjs/common";

import { CreateNotificationDTO } from "./dtos/createNotificationDTO";

@Controller("notifications")
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async createNotification(@Body() body: CreateNotificationDTO) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId
    });

    return { notification };
  }
}
