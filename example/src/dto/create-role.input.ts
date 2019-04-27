import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateRoleInput {
  @ApiModelProperty()
  name: string;
  @ApiModelPropertyOptional()
  description: string;
}
