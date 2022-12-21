import { Notification } from "@app/entities/notification";
import { NotificationsRepository } from "@app/repositories/notificationsRepository";
import { Injectable } from "@nestjs/common";

import { PrismaNotificationMapper } from "../mappers/prismaNotificationMapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: raw
    });
  }
}
