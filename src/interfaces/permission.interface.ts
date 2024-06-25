import { AuthActionVerb, AuthPossession, CustomAuthActionVerb, AuthResource } from '../types';
import { ExecutionContext } from '@nestjs/common';

export interface Permission {
  resource: AuthResource;
  action: AuthActionVerb | CustomAuthActionVerb;
  possession?: AuthPossession;
  isOwn?: (ctx: ExecutionContext) => boolean;
}
