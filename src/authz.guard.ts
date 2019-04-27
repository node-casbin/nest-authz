import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import {
  AUTHZ_ENFORCER,
  PERMISSIONS_METADATA,
  AUTHZ_MODULE_OPTIONS
} from './authz.constants';
import * as casbin from 'casbin';
import { Permission } from './interfaces/permission.interface';
import { UnauthorizedException } from '@nestjs/common';
import { AuthPossession } from './types';
import { AuthZModuleOptions } from './interfaces/authz-module-options.interface';

@Injectable()
export class AuthZGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(AUTHZ_ENFORCER) private enforcer: casbin.Enforcer,
    @Inject(AUTHZ_MODULE_OPTIONS) private options: AuthZModuleOptions
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const permissions: Permission[] = this.reflector.get<Permission[]>(
        PERMISSIONS_METADATA,
        context.getHandler()
      );

      if (!permissions) {
        return true;
      }

      const username = this.options.usernameFromContext(context);

      if (!username) {
        throw new UnauthorizedException();
      }

      const hasPermission = (user: string, permission: Permission): boolean => {
        const { possession, resource, action } = permission;
        const poss = [];

        if (possession === AuthPossession.OWN_ANY) {
          poss.push(AuthPossession.ANY, AuthPossession.OWN);
        } else {
          poss.push(possession);
        }

        return poss.some(p => {
          if (p === AuthPossession.OWN) {
            return (permission as any).isOwn(context);
          } else {
            return this.enforcer.enforce(user, resource, `${action}:${p}`);
          }
        });
      };

      const result = permissions.every(permission =>
        hasPermission(username, permission)
      );

      return result;
    } catch (e) {
      throw e;
    }
  }
}
