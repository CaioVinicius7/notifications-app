import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";

export class NotificationNotFound extends NotFoundException {
  constructor() {
    super("Notification not found.");
  }
}
