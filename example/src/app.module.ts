import { Module, ExecutionContext } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { UserController } from './controllers/user.controller';
import { RoleController } from './controllers/role.controller';
import { AuthController } from './controllers/auth.controller';
import { UserPermissionController } from './controllers/user-permission.controller';
import { UserRoleController } from './controllers/user-role.controller';

import { AuthZModule } from '../../src';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService, UserService, RoleService, JwtStrategy } from './services';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
    }),
    AuthZModule.register({
      model: 'model.conf',
      policy: 'policy.csv',
      usernameFromContext: (ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user && request.user.username;
      },
    }),
  ],
  controllers: [
    AppController,
    AuthController,
    UserController,
    RoleController,
    UserRoleController,
    UserPermissionController,
  ],
  providers: [AuthService, UserService, JwtStrategy, RoleService],
})
export class AppModule {}
