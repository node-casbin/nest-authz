import {
  ExecutionContext,
  Provider,
  DynamicModule,
  ForwardReference,
  Type
} from '@nestjs/common';
import { AuthUser, BatchApproval } from '../types';
import { ResourceFromContextFn } from './permission.interface';

export interface AuthZModuleOptions<T = any> {
  model?: string;
  policy?: string | Promise<T>;
  enablePossession?: boolean;
  userFromContext: (context: ExecutionContext) => AuthUser;
  resourceFromContext?: ResourceFromContextFn;
  batchApproval?: BatchApproval;
  enforcerProvider?: Provider<any>;
  /**
   * Optional list of imported modules that export the providers which are
   * required in this module.
   */
  imports?: Array<
    Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
}
