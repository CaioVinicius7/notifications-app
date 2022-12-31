import { KafkaConsumerService } from "@infra/messaging/kafka/kafkaConsumer.service";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions } from "@nestjs/microservices";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  const kafkaConsumerService = app.get(KafkaConsumerService);

  app.connectMicroservice<MicroserviceOptions>({
    strategy: kafkaConsumerService
  });

  await app.startAllMicroservices();

  const config = new DocumentBuilder()
    .setTitle("Notifications microservices")
    .setDescription(
      "Micro serviço de notificações desenvolvido durante o evento Ignite lab da Rocketseat"
    )
    .setVersion("1.0")
    .addTag("Notifications")
    .setContact(
      "Caio Vinícius",
      "https://github.com/caiovinicius7",
      "caio1525pereira@gmail.com"
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api-docs", app, document);

  await app.listen(3333);
}
bootstrap();
