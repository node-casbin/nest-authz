import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { LoginInput } from '../dto/login.input';
import { RegisterInput } from 'src/dto/register.input';
import { User } from '../interfaces';
import uuid = require('uuid');

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authSrv: AuthService) {}

  @ApiOperation({
    title: 'User login',
  })
  @Post('login')
  async login(@Body() credentials: LoginInput) {
    return this.authSrv.login(credentials.username, credentials.password);
  }

  @ApiOperation({
    title: 'User register',
  })
  @Post('register')
  async register(@Body() userDto: RegisterInput) {
    const data: User = Object.assign({ id: uuid.v1() }, userDto);
    return this.authSrv.register(data);
  }
}
