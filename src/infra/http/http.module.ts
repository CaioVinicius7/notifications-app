import { CancelNotification } from "@app/useCases/cancelNotification";
import { CountRecipientNotifications } from "@app/useCases/countRecipientNotifications";
import { GetRecipientNotifications } from "@app/useCases/getRecipientNotifications";
import { ReadNotification } from "@app/useCases/readNotification";
import { SendNotification } from "@app/useCases/sendNotification";
import { UnreadNotification } from "@app/useCases/unreadNotification";
import { DatabaseModule } from "@infra/database/database.module";
import { Module } from "@nestjs/common";

import { NotificationsController } from "./controllers/notifications.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    GetRecipientNotifications,
    CountRecipientNotifications
  ]
})
export class HttpModule {}
