import { NotificationsRepositoryInMemory } from "@test/repositories/NotificationsRepositoryInMemory";

import { SendNotification } from "./sendNotification";

let notificationsRepository: NotificationsRepositoryInMemory;
let sendNotification: SendNotification;

describe("Send notification", () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsRepositoryInMemory();
    sendNotification = new SendNotification(notificationsRepository);
  });

  it("should be able to send a notification", async () => {
    const { notification } = await sendNotification.execute({
      content: "Você tem uma nova solicitação de amizade",
      category: "social",
      recipientId: "ad585a3c-250a-4cea-abe2-21c4f1a1dc1f"
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
