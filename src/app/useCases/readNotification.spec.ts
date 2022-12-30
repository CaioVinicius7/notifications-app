import { makeNotification } from "@test/factories/notificationFactory";
import { NotificationsRepositoryInMemory } from "@test/repositories/NotificationsRepositoryInMemory";

import { NotificationNotFound } from "./errors/notificationNotFound";
import { ReadNotification } from "./readNotification";

let notificationsRepository: NotificationsRepositoryInMemory;
let readNotification: ReadNotification;

describe("Read notification", () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsRepositoryInMemory();
    readNotification = new ReadNotification(notificationsRepository);
  });

  it("should be able to read a notification", async () => {
    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date)
    );
  });

  it("should not be able to read a non existent notification", async () => {
    await expect(
      readNotification.execute({
        notificationId: "20eaf130-e45a-4817-8a29-f0c739c806ca"
      })
    ).rejects.toThrow(NotificationNotFound);
  });
});
