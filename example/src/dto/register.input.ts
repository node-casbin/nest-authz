import { ApiModelProperty } from '@nestjs/swagger';

export class RegisterInput {
  @ApiModelProperty({
    minLength: 8,
  })
  username: string;
  @ApiModelProperty({
    maxLength: 20,
    minLength: 6,
  })
  password: string;
}
