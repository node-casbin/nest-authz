import {
  Controller,
  Get,
  UseGuards,
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

import { Request } from 'express';

@ApiTags('User')
@ApiBearerAuth()
@Controller()
export class UserController {
  constructor(private readonly usersSrv: UserService) {}

  @ApiOperation({
    summary: 'Find all users',
  })
  @Get('users')
  @UseGuards(AuthGuard(), AuthZGuard)
  @UsePermissions({
    action: AuthActionVerb.READ,
    resource: Resource.USERS_LIST,
    possession: AuthPossession.ANY,
  })
  async findUsers() {
    return await this.usersSrv.findAll();
  }

  @ApiOperation({
    summary: 'Get own info',
  })
  @Get('users/me')
  @UseGuards(AuthGuard())
  async printCurrentUser(@Req() request: Request) {
    return request.user;
  }
}
