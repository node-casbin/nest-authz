import { ApiModelProperty } from '@nestjs/swagger';

export class AssignUserRoleInput {
  @ApiModelProperty()
  roleName: string;
}
