import { AuthAction } from '../../../src';
import { Resource, ResourceGroup } from '../resources';
import { ApiProperty } from '@nestjs/swagger';

export class AddRolePermissionInput {
  @ApiProperty({
    enum: [
      AuthAction.CREATE_ANY,
      AuthAction.CREATE_OWN,
      AuthAction.DELETE_ANY,
      AuthAction.DELETE_OWN,
      AuthAction.READ_ANY,
      AuthAction.READ_OWN,
      AuthAction.UPDATE_ANY,
      AuthAction.UPDATE_OWN,
    ],
  })
  operation: AuthAction;

  @ApiProperty({
    enum: [
      Resource.ROLES_LIST,
      Resource.ROLE_PERMISSIONS,
      Resource.USERS_LIST,
      Resource.USER_PERMISSIONS,
      Resource.USER_ROLES,
      ResourceGroup.ROLE,
      ResourceGroup.USER,
    ],
  })
  resource: Resource | ResourceGroup;
}
