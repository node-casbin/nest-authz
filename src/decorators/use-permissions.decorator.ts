import { ReflectMetadata } from '@nestjs/common';
import { Permission } from '../interfaces/permission.interface';
import { PERMISSIONS_METADATA } from '../authz.constants';

const defaultIsOwn = (request: any): boolean => false;

/**
 * 定义具有什么权限的用户才可以访问此路由。 可以定义多个权限，
 * 但是只有在所有权限都满足的情况下，权限判定才会通过。
 */
export const UsePermissions = (...permissions: Permission[]) => {
  const perms = permissions.map(item => {
    if (!item.isOwn) {
      item.isOwn = defaultIsOwn;
    }
    return item;
  });

  return ReflectMetadata(PERMISSIONS_METADATA, perms);
};
