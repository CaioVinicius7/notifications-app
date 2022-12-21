import { Notification } from "@app/entities/notification";
import { NotificationsRepository } from "@app/repositories/notificationsRepository";
import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const {
      id,
      content: { value: content },
      category,
      recipientId,
      readAt,
      createdAt
    } = notification;

    await this.prismaService.notification.create({
      data: {
        id,
        content,
        category,
        recipientId,
        readAt,
        createdAt
      }
    });
  }
}
