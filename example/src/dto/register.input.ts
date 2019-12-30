import { ApiProperty } from '@nestjs/swagger';

export class RegisterInput {
  @ApiProperty({
    minLength: 8,
  })
  username: string;
  @ApiProperty({
    maxLength: 20,
    minLength: 6,
  })
  password: string;
}
