import { CancelNotification } from "@app/useCases/cancelNotification";
import { CountRecipientNotifications } from "@app/useCases/countRecipientNotifications";
import { GetRecipientNotifications } from "@app/useCases/getRecipientNotifications";
import { ReadNotification } from "@app/useCases/readNotification";
import { SendNotification } from "@app/useCases/sendNotification";
import { UnreadNotification } from "@app/useCases/unreadNotification";
import { Controller, Post, Get, Patch, Param, Body } from "@nestjs/common";

import { NotificationViewModel } from "../viewModels/notificationViewModel";
import { CreateNotificationDTO } from "./dtos/createNotificationDTO";

@Controller("notifications")
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications
  ) {}

  @Patch("/:id/cancel")
  async cancel(@Param("id") id: string) {
    await this.cancelNotification.execute({
      notificationId: id
    });
  }

  @Get("/count/from/:recipientId")
  async countFromRecipient(@Param("recipientId") recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId
    });

    return {
      count
    };
  }

  @Get("/from/:recipientId")
  async getFromRecipient(@Param("recipientId") recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP)
    };
  }

  @Patch("/:id/read")
  async read(@Param("id") id: string) {
    await this.readNotification.execute({
      notificationId: id
    });
  }

  @Patch("/:id/unread")
  async unread(@Param("id") id: string) {
    await this.unreadNotification.execute({
      notificationId: id
    });
  }

  @Post()
  async createNotification(@Body() body: CreateNotificationDTO) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId
    });

    return {
      notification: NotificationViewModel.toHTTP(notification)
    };
  }
}
