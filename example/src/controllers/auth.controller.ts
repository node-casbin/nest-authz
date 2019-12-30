import { Controller, Post, Body } from '@nestjs/common';
import uuid = require('uuid');

import { AuthService } from '../services/auth.service';

import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LoginInput } from '../dto/login.input';
import { RegisterInput } from '../dto/register.input';
import { User } from '../interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authSrv: AuthService) {}

  @ApiOperation({
    summary: 'User login',
  })
  @Post('login')
  async login(@Body() credentials: LoginInput) {
    return this.authSrv.login(credentials.username, credentials.password);
  }

  @ApiOperation({
    summary: 'User register',
  })
  @Post('register')
  async register(@Body() userDto: RegisterInput) {
    const data: User = Object.assign({ id: uuid.v1() }, userDto);
    return this.authSrv.register(data);
  }
}
