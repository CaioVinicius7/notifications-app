import { SendNotification } from "@app/useCases/sendNotification";
import { DatabaseModule } from "@infra/database/database.module";
import { Module } from "@nestjs/common";

import { NotificationsController } from "./kafka/controllers/notifications.controller";
import { KafkaConsumerService } from "./kafka/kafkaConsumer.service";

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [KafkaConsumerService, SendNotification]
})
export class MessagingModule {}
