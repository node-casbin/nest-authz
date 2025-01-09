import {
  AuthActionVerb,
  AuthPossession,
  CustomAuthActionVerb,
  AuthResource,
  BatchApproval
} from '../types';
import { ExecutionContext } from '@nestjs/common';

export interface Permission {
  resource: AuthResource;
  action: AuthActionVerb | CustomAuthActionVerb;
  possession?: AuthPossession;
  isOwn?: (ctx: ExecutionContext) => boolean;
  resourceFromContext?: boolean | ResourceFromContextFn;
  batchApproval?: BatchApproval;
}

export type PermissionData = Omit<Permission, 'requestFromContext' | 'isOwn'>;
export type ResourceFromContextFn = (
  context: ExecutionContext,
  permission: PermissionData
) => AuthResource | AuthResource[];
