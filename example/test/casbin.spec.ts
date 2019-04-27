import * as casbin from 'casbin';
import * as path from 'path';

let enforcer: casbin.Enforcer;
const modelPath = path.join(__dirname, '../model.conf');
const policyPath = path.join(__dirname, '../policy.csv');

beforeEach(async () => {
  enforcer = await casbin.newEnforcer(modelPath, policyPath);
});

describe('Root user root', () => {
  it('can read any user roles', () => {
    const result = enforcer.enforce('root', 'user_roles', 'read:any');
    expect(result).toBe(true);
  });
  it('can read any user', () => {
    const result = enforcer.enforce('root', 'user', 'read:any');
    expect(result).toBe(true);
  });
});

describe('manager tom', () => {
  it('can read any user roles', () => {
    const result = enforcer.enforce('tom', 'user_roles', 'read:any');
    expect(result).toBe(true);
  });
  it('can not read any user', () => {
    const result = enforcer.enforce('tom', 'user', 'read:any');
    expect(result).toBe(false);
  });
});

describe('guest bob', () => {
  it('can read own user', () => {
    const result = enforcer.enforce('bob', 'user', 'read:own');
    expect(result).toBe(true);
  });
  it('can not read any user', () => {
    const result = enforcer.enforce('bob', 'user', 'read:any');
    expect(result).toBe(false);
  });
});
