import { IsNotEmpty, IsUUID, Length } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateNotificationDTO {
  @ApiProperty({
    format: "uuid",
    description: "Id do destinatário da notificação"
  })
  @IsNotEmpty({
    message: "O campo recipientId é obrigatório."
  })
  @IsUUID("4", {
    message: "O campo recipientId precisa ser um UUID."
  })
  recipientId: string;

  @ApiProperty({
    example: "Nova solicitação de amizade recebida.",
    description: "Conteúdo da notificação"
  })
  @IsNotEmpty({
    message: "O campo content é obrigatório."
  })
  @Length(5, 240, {
    message: "O campo content precisa ter de 5 a 240 caracteres."
  })
  content: string;

  @ApiProperty({
    example: "Social",
    description: "Categoria da notificação"
  })
  @IsNotEmpty({
    message: "O campo category é obrigatório."
  })
  category: string;
}
