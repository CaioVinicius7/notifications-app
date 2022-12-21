import { Notification, NotificationProps } from "@app/entities/notification";

import { NotificationsRepository } from "../../src/app/repositories/notificationsRepository";

export class NotificationsRepositoryInMemory extends NotificationsRepository {
  public notifications: NotificationProps[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
