import { ApiProperty } from '@nestjs/swagger';

export class LoginInput {
  @ApiProperty({
    minLength: 6,
    example: 'root',
  })
  username: string;

  @ApiProperty({
    maxLength: 65,
    example: 'password',
  })
  password: string;
}
