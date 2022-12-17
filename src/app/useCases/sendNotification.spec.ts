import { NotificationsRepositoryInMemory } from "../../../test/repositories/NotificationsRepositoryInMemory";
import { SendNotification } from "./sendNotification";

let notificationsRepository: NotificationsRepositoryInMemory;

describe("Send notification", () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsRepositoryInMemory();
  });

  it("should be able to send a notification", async () => {
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      content: "Você tem uma nova solicitação de amizade",
      category: "social",
      recipientId: "ad585a3c-250a-4cea-abe2-21c4f1a1dc1f"
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
