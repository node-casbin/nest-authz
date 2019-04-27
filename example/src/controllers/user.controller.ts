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
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { Resource } from '../resources';

import { Request } from 'express';

@ApiUseTags('User')
@ApiBearerAuth()
@Controller()
export class UserController {
  constructor(private readonly usersSrv: UserService) {}

  @ApiOperation({
    title: 'Find all users',
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
    title: 'Get own info',
  })
  @Get('users/me')
  @UseGuards(AuthGuard())
  async printCurrentUser(@Req() request: Request) {
    return request.user;
  }
}
