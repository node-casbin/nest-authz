import { Module, DynamicModule, Global } from '@nestjs/common';
import * as casbin from 'casbin';

import { AuthZModuleOptions } from './interfaces';
import { AuthZGuard } from './authz.guard';
import { AUTHZ_MODULE_OPTIONS, AUTHZ_ENFORCER } from './authz.constants';
import {
  AuthZRBACService,
  AuthZManagementService,
  AuthZService
} from './services';

@Global()
@Module({
  providers: [],
  exports: []
})
export class AuthZModule {
  static register(options: AuthZModuleOptions): DynamicModule {
    if (options.enablePossession === undefined) {
      options.enablePossession = true;
    }

    const moduleOptionsProvider = {
      provide: AUTHZ_MODULE_OPTIONS,
      useValue: options || {}
    };

    let enforcerProvider = options.enforcerProvider;
    const importsModule = options.imports || [];

    if (!enforcerProvider) {
      if (!options.model || !options.policy) {
        throw new Error(
          'must provide either enforcerProvider or both model and policy'
        );
      }

      enforcerProvider = {
        provide: AUTHZ_ENFORCER,
        useFactory: async () => {
          const isFile = typeof options.policy === 'string';

          let policyOption;

          if (isFile) {
            policyOption = options.policy as string;
          } else {
            policyOption = await options.policy;
          }

          return casbin.newEnforcer(options.model, policyOption);
        }
      };
    }

    return {
      module: AuthZModule,
      providers: [
        moduleOptionsProvider,
        enforcerProvider,
        AuthZGuard,
        AuthZRBACService,
        AuthZManagementService,
        AuthZService
      ],
      imports: importsModule,
      exports: [
        moduleOptionsProvider,
        enforcerProvider,
        AuthZGuard,
        AuthZRBACService,
        AuthZManagementService,
        AuthZService
      ]
    };
  }
}
