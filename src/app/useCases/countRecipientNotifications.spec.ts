import { Content } from "@app/entities/content";
import { Notification } from "@app/entities/notification";
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
      new Notification({
        category: "Social",
        content: new Content("Nova solicitação de amizade!"),
        recipientId
      })
    );

    await notificationsRepository.create(
      new Notification({
        category: "Promoções",
        content: new Content(
          "Aproveite o desconto especial em todos os cursos!"
        ),
        recipientId
      })
    );

    await notificationsRepository.create(
      new Notification({
        category: "Aulas",
        content: new Content("Novos conteúdos acabaram de ser lançados!"),
        recipientId: "cc7a8b85-8136-44d5-b163-7e2d39412864"
      })
    );

    const { count } = await countRecipientNotification.execute({
      recipientId
    });

    expect(count).toBe(2);
  });
});
