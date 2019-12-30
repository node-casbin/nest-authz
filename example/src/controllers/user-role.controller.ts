import {
  Controller,
  Get,
  UseGuards,
  Param,
  Post,
  Delete,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { RoleService, UserService } from '../services';

import {
  AuthZGuard,
  AuthActionVerb,
  AuthPossession,
  UsePermissions,
} from '../../../src';

import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { AssignUserRoleInput } from '../dto/assign-user-role.input';

import { Resource } from '../resources';
import { BadRequestException } from '@nestjs/common';
import { Query } from '@nestjs/common';

@ApiTags('UserRole')
@ApiBearerAuth()
@Controller()
export class UserRoleController {
  constructor(
    private readonly usersSrv: UserService,
    private readonly roleSrv: RoleService,
  ) {}

  // Only subject who can read any USER_ROLES or the resource owner can access this route.
  // The function `isOwn` is used to determine whether the subject is the owner of this resource or not.
  // A default `isOwn` function which returns false will be used if you omit it.
  @ApiOperation({
    summary: 'Get all roles owned by the given user',
  })
  @Get('/users/:id/roles')
  @UseGuards(AuthGuard(), AuthZGuard)
  @UsePermissions({
    action: AuthActionVerb.READ,
    resource: Resource.USER_ROLES,
    possession: AuthPossession.OWN_ANY,
    isOwn: (req: any): boolean => {
      return Number(req.user.id) === Number(req.params.id);
    },
  })
  async findUserRoles(@Param('id') id: string) {
    const user = await this.usersSrv.findById(id);

    if (!user) {
      throw new NotFoundException('The user not found');
    }

    return this.usersSrv.assignedRoles(user.username);
  }

  @ApiOperation({
    summary: 'Assign a role to the given user',
  })
  @Post('/users/:id/roles')
  @UseGuards(AuthGuard(), AuthZGuard)
  @UsePermissions({
    action: AuthActionVerb.CREATE,
    resource: Resource.USER_ROLES,
    possession: AuthPossession.ANY,
  })
  async assignUserRole(
    @Param('id') id: string,
    @Body() role: AssignUserRoleInput,
  ) {
    const user = await this.usersSrv.findById(id);

    if (!user) {
      throw new NotFoundException('The user not found');
    }

    if (user.username === 'root') {
      throw new BadRequestException(
        'Built in root user role can not be changed',
      );
    }

    return this.roleSrv.assignUser(user.username, role.roleName);
  }

  @ApiOperation({
    summary: 'Delete one of the roles owned by a given user',
  })
  @Delete('/users/:id/roles/:roleId')
  @UseGuards(AuthGuard(), AuthZGuard)
  @UsePermissions({
    action: AuthActionVerb.DELETE,
    resource: Resource.USER_ROLES,
    possession: AuthPossession.ANY,
  })
  async deAssignUserRole(
    @Param('id') id: string,
    @Param('roleId') roleId: string,
  ) {
    const [user, role] = await Promise.all([
      this.usersSrv.findById(id),
      this.roleSrv.findById(roleId),
    ]);

    if (!user) {
      throw new NotFoundException('The user not found');
    }

    if (!role) {
      throw new NotFoundException('The role not found');
    }

    return this.roleSrv.deAssignUser(user.username, role.name);
  }

  @ApiOperation({
    summary: 'Delete roles owned by a given user according to the where filter',
  })
  @Delete('/users/:id/roles')
  @UseGuards(AuthGuard(), AuthZGuard)
  @UsePermissions({
    action: AuthActionVerb.DELETE,
    resource: Resource.USER_ROLES,
    possession: AuthPossession.ANY,
  })
  async deAssignUserRoles(@Param('id') id: string, @Query('where') where: any) {
    throw new BadRequestException('The method not implemented');
  }
}
