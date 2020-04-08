import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { Role, CoreRBACRole } from '../interfaces';
import { AuthAction } from '../../../src';
import { AuthZRBACService } from '../../../src/services/authz-rbac.service';
import { UserService } from './user.service';
import { ResourceGroup, Resource } from '../resources';

const roles: Role[] = [
  {
    id: '8ec0934d-7732-4f05-9c3b-2e0284bf54c6',
    name: 'superuser',
    description: 'can read any user',
  },
  {
    id: '2d6f41f2-33ca-43e2-a415-ef163649c60d',
    name: 'guest',
    description: 'can read own user',
  },
  {
    id: '2d6f41f2-33ca-43e2-a415-ef163649c60d',
    name: 'manager',
    description: ' can read any user',
  },
];

@Injectable()
export class RoleService implements CoreRBACRole {
  constructor(
    private readonly userSrv: UserService,
    private readonly authzService: AuthZRBACService,
  ) {}
  async addRole(role: Role) {
    const isExists = await this.exists(role.name);
    if (isExists) {
      throw new BadRequestException(`The role ${role.name} is already exists`);
    }

    const data: Role = Object.assign({}, { id: '1' }, role);
    roles.push(data);
  }

  async deleteRole(role: string) {
    const index = await this.findIndexByName(role);

    if (index === -1) {
      throw new NotFoundException(`The role ${role} not found.`);
    }

    roles.splice(index, 1);

    await this.authzService.deleteRole(role);
  }

  async assignUser(user: string, role: string): Promise<boolean> {
    const [isUserExists, isRoleExists] = await Promise.all([
      this.userSrv.exists(user),
      this.exists(role),
    ]);
    if (!isUserExists) {
      throw new NotFoundException(`The user ${user} not found`);
    }

    if (!isRoleExists) {
      throw new NotFoundException(`The role ${role} not found`);
    }

    return this.authzService.addRoleForUser(user, role);
  }

  async deAssignUser(user: string, role: string): Promise<boolean> {
    const [isUserExists, isRoleExists] = await Promise.all([
      this.userSrv.exists(user),
      this.exists(role),
    ]);
    if (!isUserExists) {
      throw new NotFoundException(`The user ${user} not found`);
    }

    if (!isRoleExists) {
      throw new NotFoundException(`The role ${role} not found`);
    }

    const hasRole = await this.authzService.hasRoleForUser(user, role);

    if (!hasRole) {
      throw new BadRequestException(
        `The user ${user} does not have role ${role}`,
      );
    }

    return this.authzService.deleteRoleForUser(user, role);
  }

  async grantPermission(
    role: string,
    operation: AuthAction,
    object: ResourceGroup | Resource,
  ): Promise<boolean> {
    const isRoleExists = await this.exists(role);
    if (!isRoleExists) {
      throw new NotFoundException(`The role ${role} not found`);
    }

    return this.authzService.addPermissionForUser(role, object, operation);
  }

  async revokePermission(
    role: string,
    operation: AuthAction,
    object: ResourceGroup | Resource,
  ) {
    const isRoleExists = await this.exists(role);
    if (!isRoleExists) {
      throw new NotFoundException(`The role ${role} not found`);
    }

    if (!this.authzService.hasPermissionForUser(role, object, operation)) {
      throw new BadRequestException(
        `The permission ${operation} ${object} isn't assigned to the role ${role}`,
      );
    }

    return this.authzService.deletePermissionForUser(role, object, operation);
  }

  async assignedUsers(role: string): Promise<string[]> {
    const isRoleExists = await this.exists(role);
    if (!isRoleExists) {
      throw new NotFoundException(`The role ${role} not found`);
    }

    return this.authzService.getUsersForRole(role);
  }

  async rolePermissions(role: string): Promise<string[][]> {
    const isRoleExists = await this.exists(role);
    if (!isRoleExists) {
      throw new NotFoundException(`The role ${role} not found`);
    }

    return this.authzService.getPermissionsForUser(role);
  }

  async findPermissionsForRole(role: string) {
    const isRoleExists = await this.exists(role);
    if (!isRoleExists) {
      throw new NotFoundException(`The role ${role} not found`);
    }

    return this.authzService.getPermissionsForUser(role);
  }

  async exists(name: string) {
    for (const role of roles) {
      if (role.name === name) {
        return true;
      }
    }
    return false;
  }

  private async findIndexByName(name: string): Promise<number> {
    let index = -1;
    for (let i = 0; i < roles.length; i++) {
      const item = roles[i];
      if (item.name === name) {
        index = i;
      }
    }
    return index;
  }

  async findAllRoles(): Promise<Role[]> {
    return roles;
  }

  async findById(id: string): Promise<Role | null> {
    for (const role of roles) {
      if (role.id === id) {
        return role;
      }
    }
    return null;
  }
}
