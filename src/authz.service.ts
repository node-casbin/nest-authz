import { Injectable, Inject } from '@nestjs/common';
import { AUTHZ_ENFORCER } from './authz.constants';
import * as casbin from 'casbin';

@Injectable()
export class AuthZService {
  constructor(
    @Inject(AUTHZ_ENFORCER)
    private readonly enforcer: casbin.Enforcer
  ) {}

  async getRolesForUser(name: string, domain?: string): Promise<string[]> {
    return this.enforcer.getRolesForUser(name, domain);
  }

  async getUsersForRole(name: string, domain?: string): Promise<string[]> {
    return this.enforcer.getUsersForRole(name, domain);
  }

  async hasRoleForUser(
    name: string,
    role: string,
    domain?: string
  ): Promise<boolean> {
    return this.enforcer.hasRoleForUser(name, role, domain);
  }

  async addRoleForUser(
    user: string,
    role: string,
    domain?: string
  ): Promise<boolean> {
    return this.enforcer.addRoleForUser(user, role, domain);
  }

  async deleteRoleForUser(
    user: string,
    role: string,
    domain?: string
  ): Promise<boolean> {
    return this.enforcer.deleteRoleForUser(user, role, domain);
  }

  async deleteRolesForUser(user: string): Promise<boolean> {
    return this.enforcer.deleteRolesForUser(user);
  }

  async deleteUser(user: string): Promise<boolean> {
    return this.enforcer.deleteUser(user);
  }

  async deleteRole(role: string): Promise<boolean> {
    return this.enforcer.deleteRole(role);
  }

  async deletePermission(...permission: string[]): Promise<boolean> {
    return this.enforcer.deletePermission(...permission);
  }

  async addPermissionForUser(
    user: string,
    ...permission: string[]
  ): Promise<boolean> {
    return this.enforcer.addPermissionForUser(user, ...permission);
  }

  async deletePermissionForUser(
    user: string,
    ...permission: string[]
  ): Promise<boolean> {
    return this.enforcer.deletePermissionForUser(user, ...permission);
  }

  async deletePermissionsForUser(user: string): Promise<boolean> {
    return this.enforcer.deletePermissionsForUser(user);
  }

  async getPermissionsForUser(user: string): Promise<string[][]> {
    return this.enforcer.getPermissionsForUser(user);
  }

  async hasPermissionForUser(
    user: string,
    ...permission: string[]
  ): Promise<boolean> {
    return this.enforcer.hasPermissionForUser(user, ...permission);
  }
}
