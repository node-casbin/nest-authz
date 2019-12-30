import { AddRolePermissionInput } from '../dto/add-role-permission.input';
import {
  Controller,
  Get,
  UseGuards,
  Param,
  Post,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { RoleService } from '../services/role.service';

import {
  AuthZGuard,
  AuthActionVerb,
  AuthPossession,
  UsePermissions,
} from '../../../src';

import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { Role } from '../interfaces';

import { Resource, ResourceGroup } from '../resources';

import { CreateRoleInput } from '../dto/create-role.input';
import * as uuid from 'uuid';

@ApiTags('Role')
@ApiBearerAuth()
@Controller()
export class RoleController {
  constructor(private readonly roleSrv: RoleService) {}

  @ApiOperation({
    summary: 'Find all roles',
  })
  @Get('roles')
  @UseGuards(AuthGuard(), AuthZGuard)
  @UsePermissions({
    action: AuthActionVerb.READ,
    resource: Resource.ROLES_LIST,
    possession: AuthPossession.ANY,
  })
  async findAllRoles() {
    return await this.roleSrv.findAllRoles();
  }

  @ApiOperation({
    summary: 'Create a new role',
  })
  @Post('roles')
  @UseGuards(AuthGuard(), AuthZGuard)
  @UsePermissions({
    action: AuthActionVerb.CREATE,
    resource: ResourceGroup.USER,
    possession: AuthPossession.ANY,
  })
  async createRole(@Body() role: CreateRoleInput) {
    const data: Role = Object.assign(
      {
        id: uuid.v1(),
      },
      role,
    );
    return this.roleSrv.addRole(data);
  }

  @ApiOperation({
    summary: 'Get all permissions assigned to the given role',
  })
  @Get('/roles/:id/permissions')
  @UseGuards(AuthGuard(), AuthZGuard)
  @UsePermissions({
    action: AuthActionVerb.READ,
    resource: Resource.ROLE_PERMISSIONS,
    possession: AuthPossession.ANY,
  })
  async findRolePermissions(@Param('id') id: string) {
    const role = await this.roleSrv.findById(id);

    if (!role) {
      throw new NotFoundException('The role not found');
    }
    return this.roleSrv.findPermissionsForRole(role.name);
  }

  @ApiOperation({
    summary: 'Grant a permission to the given role',
  })
  @Post('/roles/:id/permissions')
  @UseGuards(AuthGuard(), AuthZGuard)
  @UsePermissions({
    action: AuthActionVerb.CREATE,
    resource: Resource.ROLE_PERMISSIONS,
    possession: AuthPossession.ANY,
  })
  async addRolePermission(
    @Param('id') id: string,
    @Body() addPermissionDto: AddRolePermissionInput,
  ) {
    const role = await this.roleSrv.findById(id);

    if (!role) {
      throw new NotFoundException('The role not found');
    }

    const { operation, resource } = addPermissionDto;
    return this.roleSrv.grantPermission(role.name, operation, resource);
  }
}
