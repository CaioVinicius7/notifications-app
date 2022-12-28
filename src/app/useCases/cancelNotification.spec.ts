import { makeNotification } from "@test/factories/notificationFactory";
import { NotificationsRepositoryInMemory } from "@test/repositories/NotificationsRepositoryInMemory";

import { CancelNotification } from "./cancelNotification";
import { NotificationNotFound } from "./errors/notificationNotFound";

let notificationsRepository: NotificationsRepositoryInMemory;
let cancelNotification: CancelNotification;

describe("Cancel notification", () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsRepositoryInMemory();
    cancelNotification = new CancelNotification(notificationsRepository);
  });

  it("should be able to cancel a notification", async () => {
    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date)
    );
  });

  it("should not be able to cancel a non existent notification", async () => {
    await expect(
      cancelNotification.execute({
        notificationId: "20eaf130-e45a-4817-8a29-f0c739c806ca"
      })
    ).rejects.toThrow(NotificationNotFound);
  });
});
