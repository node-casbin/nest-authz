import { SetMetadata } from '@nestjs/common';
import { Permission } from '../interfaces/permission.interface';
import { PERMISSIONS_METADATA } from '../authz.constants';
import { ExecutionContext } from '@nestjs/common';
import { AuthPossession } from '../types';

const defaultIsOwn = (ctx: ExecutionContext): boolean => false;

/**
 * You can define multiple permissions, but only
 * when all of them satisfied, could you access the route.
 */
export const UsePermissions = (...permissions: Permission[]): any => {
  const perms = permissions.map(item => {
    if (!item.possession) {
      item.possession = AuthPossession.ANY;
    }
    if (!item.isOwn) {
      item.isOwn = defaultIsOwn;
    }
    return item;
  });

  return SetMetadata(PERMISSIONS_METADATA, perms);
};
