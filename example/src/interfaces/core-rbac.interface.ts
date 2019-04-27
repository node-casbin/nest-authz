export interface User {
  id: string;
  username: string;
  password: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
}

export interface CoreRBACUser {
  // creates a new RBAC user
  addUser(user: User): Promise<any>;
  // deletes an existing user from the RBAC database.
  deleteUser(username: string): Promise<any>;
  // returns the set of roles assigned to a given user
  assignedRoles(username: string): Promise<string[]>;
  // returns the permissions a given user gets through his/her assigned roles.
  userPermissions(username: string): Promise<any[]>;
}

export interface CoreRBACRole {
  // creates a new role
  addRole(role: Role): Promise<any>;
  // deletes an existing role from the RBAC database
  deleteRole(role: string): Promise<any>;
  // assigns a user to a role
  assignUser(user: string, role: string): Promise<any>;
  // deletes the assignment of the user `user` to the role `role`
  deAssignUser(user: string, role: string): Promise<any>;
  // grants a role the permission to perform an operation on an object to a role.
  grantPermission(role: string, operation: any, object: any): Promise<any>;
  // revokes the permission to perform an operation on an object from the set of permissions assigned to a role
  revokePermission(role: string, operation: any, object: any): Promise<any>;

  // review functions for core rbac

  // returns the set of users assigned to a given role
  assignedUsers(role: string): Promise<string[]>;
  // returns the set of permissions(object, operation) granted to a given role
  rolePermissions(role: string): Promise<any[]>;
}
