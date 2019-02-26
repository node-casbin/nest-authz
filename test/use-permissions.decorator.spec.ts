import {
  UsePermissions,
  PERMISSIONS_METADATA,
  Permission,
  AuthAction,
  AuthPossession,
} from '../src';

describe('@UsePermissions()', () => {
  it('should set metadata correctly', () => {
    const permissions: Permission[] = [
      {
        resource: 'test',
        action: AuthAction.READ,
        possession: AuthPossession.ANY,
      },
    ];
    class TestController {
      @UsePermissions(...permissions)
      getData() {
        return null;
      }
    }
    const res = Reflect.getMetadata(
      PERMISSIONS_METADATA,
      TestController.prototype.getData,
    );
    expect(res).toEqual(permissions);
  });
});
