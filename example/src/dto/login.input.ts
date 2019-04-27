import { ApiModelProperty } from '@nestjs/swagger';

export class LoginInput {
  @ApiModelProperty({
    minLength: 6,
    example: 'root',
  })
  username: string;

  @ApiModelProperty({
    maxLength: 65,
    example: 'password',
  })
  password: string;
}
