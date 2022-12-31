import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: "notifications",
        brokers: [process.env.KAFKA_UPSTASH_ENDPOINT as string],
        sasl: {
          mechanism: "scram-sha-256",
          username: process.env.KAFKA_UPSTASH_USERNAME as string,
          password: process.env.KAFKA_UPSTASH_PASSWORD as string
        },
        ssl: true
      }
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
