import { Controller, Post, Body } from "@nestjs/common";

import { CreateNotificationDTO } from "../dtos/createNotificationDTO";

@Controller("notifications")
export class NotificationsController {
  @Post()
  async createNotification(@Body() body: CreateNotificationDTO): Promise<void> {
    const { recipientId, content, category } = body;
  }
}
