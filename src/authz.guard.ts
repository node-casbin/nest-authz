import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AUTHZ_ENFORCER, PERMISSIONS_METADATA } from './authz.constants';
import * as casbin from 'casbin';
import { Permission } from './interfaces/permission.interface';
import { UnauthorizedException } from '@nestjs/common';
import { AuthPossession } from './types';

@Injectable()
export class AuthZGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(AUTHZ_ENFORCER) public enforcer: casbin.Enforcer
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const permissions: Permission[] = this.reflector.get<Permission[]>(
      PERMISSIONS_METADATA,
      context.getHandler()
    );

    if (!permissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException();
    }

    const { username: uname } = user;

    const hasPermission = (
      username: string,
      permission: Permission
    ): boolean => {
      const { possession, resource, action } = permission;
      const poss = [];

      if (possession === AuthPossession.OWN_ANY) {
        poss.push(AuthPossession.ANY, AuthPossession.OWN);
      } else {
        poss.push(possession);
      }

      return poss.some(p => {
        if (p === AuthPossession.OWN) {
          return (permission as any).isOwn(request);
        } else {
          return this.enforcer.enforce(username, resource, `${action}:${p}`);
        }
      });
    };

    const result = permissions.every(permission =>
      hasPermission(uname, permission)
    );

    return result;
  }
}
