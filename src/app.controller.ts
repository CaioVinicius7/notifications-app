import { Controller, Get } from "@nestjs/common";
import { Notification } from "@prisma/client";

import { AppService } from "./app.service";

@Controller("notifications")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async listAllNotifications(): Promise<Notification[]> {
    return await this.appService.listAllNotifications();
  }
}
