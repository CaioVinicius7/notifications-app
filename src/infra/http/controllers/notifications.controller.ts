import { CancelNotification } from "@app/useCases/cancelNotification";
import { CountRecipientNotifications } from "@app/useCases/countRecipientNotifications";
import { GetRecipientNotifications } from "@app/useCases/getRecipientNotifications";
import { ReadNotification } from "@app/useCases/readNotification";
import { SendNotification } from "@app/useCases/sendNotification";
import { UnreadNotification } from "@app/useCases/unreadNotification";
import { Controller, Post, Get, Patch, Param, Body } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags
} from "@nestjs/swagger";

import { NotificationViewModel } from "../viewModels/notificationViewModel";
import { CreateNotificationDTO } from "./dtos/createNotificationDTO";

@ApiTags("Notifications")
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

  @ApiParam({
    name: "id",
    description: "Id da notificação a ser cancelada",
    schema: {
      format: "uuid"
    }
  })
  @ApiOkResponse({
    description: "Notificação cancelada com sucesso."
  })
  @ApiNotFoundResponse({
    description: "Notificação com o uuid fornecido não encontrada.",
    schema: {
      example: {
        statusCode: 400,
        message: "Notification not found.",
        error: "Not Found"
      }
    }
  })
  @Patch("/:id/cancel")
  async cancel(@Param("id") id: string) {
    await this.cancelNotification.execute({
      notificationId: id
    });
  }

  @ApiParam({
    name: "recipientId",
    description: "Id do destinatário das notificações",
    schema: {
      format: "uuid"
    }
  })
  @ApiOkResponse({
    description: "Quantidades de notificações enviadas ao destinatário.",
    schema: {
      example: {
        count: 4
      }
    }
  })
  @Get("/count/from/:recipientId")
  async countFromRecipient(@Param("recipientId") recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId
    });

    return {
      count
    };
  }

  @ApiParam({
    name: "recipientId",
    description: "Id do destinatário das notificações",
    schema: {
      format: "uuid"
    }
  })
  @ApiOkResponse({
    description: "Notificações enviadas ao destinatário.",
    schema: {
      example: {
        notifications: [
          {
            id: "64c9d6e9-3b3d-4847-9b1b-e1f6a0903f70",
            content: "Nova solicitação de amizade recebida.",
            category: "Social",
            recipientId: "40b4f5ab-51e1-47ae-815b-6d5aab296aee"
          }
        ]
      }
    }
  })
  @Get("/from/:recipientId")
  async getFromRecipient(@Param("recipientId") recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP)
    };
  }

  @ApiParam({
    name: "id",
    description: "Id da notificação a ser marcada como lida",
    schema: {
      format: "uuid"
    }
  })
  @ApiOkResponse({
    description: "Notificação marcada como lida com sucesso."
  })
  @ApiNotFoundResponse({
    description: "Notificação com o uuid fornecido não encontrada.",
    schema: {
      example: {
        statusCode: 400,
        message: "Notification not found.",
        error: "Not Found"
      }
    }
  })
  @Patch("/:id/read")
  async read(@Param("id") id: string) {
    await this.readNotification.execute({
      notificationId: id
    });
  }

  @ApiParam({
    name: "id",
    description: "Id da notificação a ser marcada como não lida",
    schema: {
      format: "uuid"
    }
  })
  @ApiOkResponse({
    description: "Notificação marcada como não lida com sucesso."
  })
  @ApiNotFoundResponse({
    description: "Notificação com o uuid fornecido não encontrada.",
    schema: {
      example: {
        statusCode: 400,
        message: "Notification not found.",
        error: "Not Found"
      }
    }
  })
  @Patch("/:id/unread")
  async unread(@Param("id") id: string) {
    await this.unreadNotification.execute({
      notificationId: id
    });
  }

  @ApiCreatedResponse({
    description: "Notificação enviada com sucesso.",
    schema: {
      example: {
        notification: {
          id: "64c9d6e9-3b3d-4847-9b1b-e1f6a0903f70",
          content: "Nova solicitação de amizade recebida.",
          category: "Social",
          recipientId: "40b4f5ab-51e1-47ae-815b-6d5aab296aee"
        }
      }
    }
  })
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
