import { NotificationsRepository } from "@app/repositories/notificationsRepository";
import { Module } from "@nestjs/common";

import { PrismaService } from "./prisma/prisma.service";
import { PrismaNotificationsRepository } from "./prisma/repositories/prismaNotificationsRepository";

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository
    }
  ],
  exports: [NotificationsRepository]
})
export class DatabaseModule {}
