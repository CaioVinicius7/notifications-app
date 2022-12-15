import { Content } from "./content";
import { Notification } from "./notification";

describe("Notification", () => {
  it("should be able to create a notification", () => {
    const notification = new Notification({
      content: new Content("Nova solicitação de amizade"),
      category: "social",
      recipientId: "0d1698af-b6fe-4d62-a430-8490a2b738dc"
    });

    expect(notification).toBeTruthy();
  });
});
