import { AuthAction, AuthPossession } from '../types';

export interface Permission {
  resource: string;
  action: AuthAction;
  possession: AuthPossession;
  isOwn?: (request: any) => boolean;
}
