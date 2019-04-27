import { Module, DynamicModule, Global } from '@nestjs/common';
import { AuthZModuleOptions } from './interfaces';

import { AuthZGuard } from './authz.guard';

import { AUTHZ_MODULE_OPTIONS, AUTHZ_ENFORCER } from './authz.constants';
import * as casbin from 'casbin';
import { AuthZRBACService, AuthZManagementService } from './services';

@Global()
@Module({
  providers: [],
  exports: []
})
export class AuthZModule {
  static register(options: AuthZModuleOptions): DynamicModule {
    const moduleOptionsProvider = {
      provide: AUTHZ_MODULE_OPTIONS,
      useValue: options || {}
    };

    const enforcerProvider = {
      provide: AUTHZ_ENFORCER,
      useFactory: async () => {
        const isFile = typeof options.policy === 'string';

        let policyOption;

        if (isFile) {
          policyOption = options.policy as string;
        } else {
          policyOption = await options.policy;
        }

        return await casbin.newEnforcer(options.model, policyOption);
      }
    };
    return {
      module: AuthZModule,
      providers: [
        moduleOptionsProvider,
        enforcerProvider,
        AuthZGuard,
        AuthZRBACService,
        AuthZManagementService
      ],
      exports: [
        moduleOptionsProvider,
        enforcerProvider,
        AuthZGuard,
        AuthZRBACService,
        AuthZManagementService
      ]
    };
  }
}
