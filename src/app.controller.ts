import { Controller, Get, Post, Body } from "@nestjs/common";
import { Notification } from "@prisma/client";

import { AppService } from "./app.service";
import { CreateNotificationDTO } from "./dto/createNotificationDTO";

@Controller("notifications")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async listAllNotifications(): Promise<Notification[]> {
    return await this.appService.listAllNotifications();
  }

  @Post()
  async createNotification(@Body() body: CreateNotificationDTO) {
    const { recipientId, content, category } = body;

    return await this.appService.createNotification({
      recipientId,
      content,
      category
    });
  }
}
