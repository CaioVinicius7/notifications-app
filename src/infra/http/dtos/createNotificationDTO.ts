import { IsNotEmpty, IsUUID, Length } from "class-validator";

export class CreateNotificationDTO {
  @IsNotEmpty({
    message: "O campo recipientId é obrigatório."
  })
  @IsUUID("4", {
    message: "O campo recipientId precisa ser um UUID."
  })
  recipientId: string;

  @IsNotEmpty({
    message: "O campo content é obrigatório."
  })
  @Length(5, 240, {
    message: "O campo content precisa ter de 5 a 240 caracteres."
  })
  content: string;

  @IsNotEmpty({
    message: "O campo category é obrigatório."
  })
  category: string;
}
