import { AuthActionVerb, AuthPossession } from '../types';
import { ExecutionContext } from '@nestjs/common';

export interface Permission {
  resource: string;
  action: AuthActionVerb;
  possession: AuthPossession;
  isOwn?: (ctx: ExecutionContext) => boolean;
}
