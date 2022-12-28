import { Content } from "@app/entities/content";
import { Notification, NotificationProps } from "@app/entities/notification";

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: "Social",
    content: new Content("Nova solicitação de amizade!"),
    recipientId: "recipient-id",
    ...override
  });
}
