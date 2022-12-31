import { Module } from "@nestjs/common";

import { KafkaConsumerService } from "./kafka/kafkaConsumer.service";

@Module({
  imports: [],
  controllers: [],
  providers: [KafkaConsumerService]
})
export class MessagingModule {}
