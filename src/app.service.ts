import { Injectable } from "@nestjs/common";
import { Notification } from "@prisma/client";

import { PrismaService } from "./prisma.service";

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async listAllNotifications(): Promise<Notification[]> {
    return await this.prisma.notification.findMany();
  }
}
