import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoleInput {
  @ApiProperty()
  name: string;
  @ApiPropertyOptional()
  description: string;
}
