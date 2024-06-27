import {
  UsePermissions,
  PERMISSIONS_METADATA,
  Permission,
  AuthActionVerb,
  AuthPossession
} from '../src';

describe('@UsePermissions()', () => {
  it('should set metadata correctly', () => {
    const permissions: Permission[] = [
      {
        resource: 'test',
        action: AuthActionVerb.READ,
        possession: AuthPossession.ANY
      },
      {
        resource: {type: 'testType', id: 'testId'},
        action: AuthActionVerb.CREATE,
        possession: AuthPossession.OWN,
      }
    ];
    class TestController {
      @UsePermissions(...permissions)
      getData(): boolean {
        return false;
      }
    }
    const res = Reflect.getMetadata(
      PERMISSIONS_METADATA,
      TestController.prototype.getData
    );
    expect(res).toEqual(permissions);
  });
});
