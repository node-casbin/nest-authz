import {
  UsePermissions,
  PERMISSIONS_METADATA,
  Permission,
  AuthActionVerb,
  AuthPossession
} from '../src';

import { describe, expect, it } from 'vitest';

describe('@UsePermissions()', () => {
  it('should set metadata correctly', () => {
    const permissions: Permission[] = [
      {
        resource: 'test',
        action: AuthActionVerb.READ,
        possession: AuthPossession.ANY
      }
    ];
    class TestController {
      @UsePermissions(...permissions)
      getData() {
        return null;
      }
    }
    const res = Reflect.getMetadata(
      PERMISSIONS_METADATA,
      TestController.prototype.getData
    );
    expect(res).toEqual(permissions);
  });
});
