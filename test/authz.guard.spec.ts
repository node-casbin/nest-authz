import {
  Permission,
  AuthActionVerb,
  AuthPossession,
  PermissionData,
  AuthZGuard,
  BatchApproval
} from '../src';

describe('@AuthZGuard()', () => {
  const policies = [
    ['user1', 'resourceType1', 'id1', AuthActionVerb.READ],
    ['user1', 'resourceType1', 'id2', AuthActionVerb.READ],
    ['user1', 'resourceType1', 'id3', AuthActionVerb.READ],
    ['user2', 'resourceType1', 'id1', AuthActionVerb.READ],
    ['user2', 'resourceType1', 'id3', AuthActionVerb.READ],
  ];

  const mockEnforcer: any = {
    enforce: (userId: string, resource: any, action: string) => {
      return policies.some((p) => p[0] === userId && p[1] === resource.type && p[2] === resource.id && p[3] === action);
    },
    batchEnforce: (checks: string[][]) => {
      return checks.map((res: any) => {
        return policies.some((p) => p[0] === res[0] && p[1] === res[1].type && p[2] === res[1].id && p[3] === res[2])
      });
    },
  };

  const mockOptions: any = {
    userFromContext: (ctx: any) => ctx.user.id,
  }

  const getMockContext = (user: string, resources: any): any => ({
      getHandler: () => null,
      data: {id: resources},
      user: {id: user}
  });

  const getMockReflector = (permissions: Permission[]): any => ({
    get: (meta: any, handler: any) => permissions,
  });

  it('should enforce specific resource', async () => {
    const permission: Permission[] = [
      {
        resource: 'resourceType1',
        action: AuthActionVerb.READ,
        resourceFromContext: (ctx: any, perm: PermissionData) => ({type: perm.resource, id: ctx.data.id})
      },
    ];

    const guard = new AuthZGuard(getMockReflector(permission), mockEnforcer, mockOptions);

    expect(guard.canActivate(getMockContext('user1', 'id1'))).resolves.toEqual(true);
    expect(guard.canActivate(getMockContext('user2', 'id1'))).resolves.toEqual(true);
    expect(guard.canActivate(getMockContext('user2', 'id2'))).resolves.toEqual(false);
  });

  it('should batch enforce ALL specific resources', async () => {
    const permission2: Permission[] = [
      {
        resource: 'resourceType1',
        action: AuthActionVerb.READ,
        resourceFromContext: (ctx: any, perm: PermissionData) => {
          return ctx.data.id.map((id: string) => ({type: perm.resource, id}))
        }
      },
    ];

    const guard = new AuthZGuard(getMockReflector(permission2), mockEnforcer, mockOptions);

    expect(guard.canActivate(getMockContext('user1', ['id1', 'id2', 'id3']))).resolves.toEqual(true);
    expect(guard.canActivate(getMockContext('user2', ['id1', 'id3']))).resolves.toEqual(true);
    expect(guard.canActivate(getMockContext('user2', ['id1', 'id2', 'id3']))).resolves.toEqual(false);
  });

  it('should batch enforce ANY specific resources', async () => {
    const permission2: Permission[] = [
      {
        resource: 'resourceType1',
        action: AuthActionVerb.READ,
        resourceFromContext: (ctx: any, perm: PermissionData) => {
          return ctx.data.id.map((id: string) => ({type: perm.resource, id}))
        },
        batchApproval: BatchApproval.ANY,
      },
    ];

    const guard = new AuthZGuard(getMockReflector(permission2), mockEnforcer, mockOptions);

    expect(guard.canActivate(getMockContext('user2', ['id1', 'id2', 'id3']))).resolves.toEqual(true);
  });
});
