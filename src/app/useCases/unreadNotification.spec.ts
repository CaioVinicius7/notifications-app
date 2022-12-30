import { makeNotification } from "@test/factories/notificationFactory";
import { NotificationsRepositoryInMemory } from "@test/repositories/NotificationsRepositoryInMemory";

import { NotificationNotFound } from "./errors/notificationNotFound";
import { UnreadNotification } from "./unreadNotification";

let notificationsRepository: NotificationsRepositoryInMemory;
let unreadNotification: UnreadNotification;

describe("Unread notification", () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsRepositoryInMemory();
    unreadNotification = new UnreadNotification(notificationsRepository);
  });

  it("should be able to Unread a notification", async () => {
    const notification = makeNotification({
      readAt: new Date()
    });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it("should not be able to Unread a non existent notification", async () => {
    await expect(
      unreadNotification.execute({
        notificationId: "20eaf130-e45a-4817-8a29-f0c739c806ca"
      })
    ).rejects.toThrow(NotificationNotFound);
  });
});
