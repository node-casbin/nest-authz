import { Module, ExecutionContext } from '@nestjs/common';
import * as casbin from 'casbin';

import { AppController } from './controllers/app.controller';
import { UserController } from './controllers/user.controller';
import { RoleController } from './controllers/role.controller';
import { AuthController } from './controllers/auth.controller';
import { UserPermissionController } from './controllers/user-permission.controller';
import { UserRoleController } from './controllers/user-role.controller';

import { AuthZModule, AUTHZ_ENFORCER } from '../../src';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from './config.module';

import {
  AuthService,
  UserService,
  RoleService,
  JwtStrategy,
  ConfigService,
} from './services';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'secretKey',
    }),
    AuthZModule.register({
      imports: [ConfigModule],
      enforcerProvider: {
        provide: AUTHZ_ENFORCER,
        useFactory: async (configSrv: ConfigService) => {
          const config = await configSrv.getAuthConfig();
          return casbin.newEnforcer(config.model, config.policy);
        },
        inject: [ConfigService],
      },
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
