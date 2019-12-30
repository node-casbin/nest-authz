import { ApiProperty } from '@nestjs/swagger';

export class AssignUserRoleInput {
  @ApiProperty()
  roleName: string;
}
