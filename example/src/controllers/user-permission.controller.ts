import {
  Controller,
  Get,
  UseGuards,
  Param,
  Post,
  Body,
  NotFoundException,
  Delete,
  Req,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import {
  AuthZGuard,
  AuthActionVerb,
  AuthPossession,
  UsePermissions,
} from '../../../src';

import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { Resource } from '../resources';

@ApiTags('UserPermission')
@ApiBearerAuth()
@Controller()
export class UserPermissionController {
  constructor(private readonly usersSrv: UserService) {}

  @ApiOperation({
    summary: 'Get all permissions owned by the given user',
  })
  @Get('/users/:id/permissions')
  @UseGuards(AuthGuard(), AuthZGuard)
  @UsePermissions({
    action: AuthActionVerb.READ,
    resource: Resource.USER_ROLES,
    possession: AuthPossession.OWN_ANY,
    isOwn: (req: any): boolean => {
      return Number(req.user.id) === Number(req.params.id);
    },
  })
  async findUserPermissions(@Param('id') id: string) {
    const user = await this.usersSrv.findById(id);

    if (!user) {
      throw new NotFoundException('The user not found');
    }

    if (user.username === 'root') {
      // built-in superuser with all permissions
      return ['*'];
    }

    return this.usersSrv.userPermissions(user.username);
  }
}
