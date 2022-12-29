import { makeNotification } from "@test/factories/notificationFactory";
import { NotificationsRepositoryInMemory } from "@test/repositories/NotificationsRepositoryInMemory";

import { GetRecipientNotifications } from "./getRecipientNotifications";

let notificationsRepository: NotificationsRepositoryInMemory;
let getRecipientNotifications: GetRecipientNotifications;

describe("Get recipient notifications", () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsRepositoryInMemory();
    getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository
    );
  });

  it("should be able to get a recipient notifications", async () => {
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId }),
        expect.objectContaining({ recipientId })
      ])
    );
  });
});
