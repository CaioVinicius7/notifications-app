import { makeNotification } from "@test/factories/notificationFactory";
import { NotificationsRepositoryInMemory } from "@test/repositories/NotificationsRepositoryInMemory";

import { CountRecipientNotification } from "./countRecipientNotifications";

let notificationsRepository: NotificationsRepositoryInMemory;
let countRecipientNotification: CountRecipientNotification;

describe("Count recipient notifications", () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsRepositoryInMemory();
    countRecipientNotification = new CountRecipientNotification(
      notificationsRepository
    );
  });

  it("should be able to count a recipient notifications", async () => {
    const recipientId = "c675005e-eed0-44de-92a5-5c99b4439fd1";

    await notificationsRepository.create(
      makeNotification({
        recipientId
      })
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId
      })
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: "fake-recipient-id"
      })
    );

    const { count } = await countRecipientNotification.execute({
      recipientId
    });

    expect(count).toBe(2);
  });
});
