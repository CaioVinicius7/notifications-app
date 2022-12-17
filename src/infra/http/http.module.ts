import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { NotificationsController } from "./controllers/notifications.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController]
})
export class HttpModule {}
