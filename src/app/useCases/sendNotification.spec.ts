import { SendNotification } from "./sendNotification";

describe("Send notification", () => {
  it("should be able to send a notification", async () => {
    const sendNotification = new SendNotification();

    const { notification } = await sendNotification.execute({
      content: "Você tem uma nova solicitação de amizade",
      category: "social",
      recipientId: "ad585a3c-250a-4cea-abe2-21c4f1a1dc1f"
    });

    expect(notification).toBeTruthy();
  });
});
