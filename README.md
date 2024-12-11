# nest-authz

[![NPM version][npm-image]][npm-url]
[![NPM download][download-image]][download-url]
[![ci](https://github.com/node-casbin/nest-authz/actions/workflows/ci.yml/badge.svg)](https://github.com/node-casbin/nest-authz/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/node-casbin/nest-authz/badge.svg?branch=master)](https://coveralls.io/github/node-casbin/nest-authz?branch=master)
[![Discord](https://img.shields.io/discord/1022748306096537660?logo=discord&label=discord&color=5865F2)](https://discord.gg/S5UjpzGZjN)

[npm-image]: https://img.shields.io/npm/v/nest-authz.svg?style=flat-square
[npm-url]: https://npmjs.org/package/nest-authz
[download-image]: https://img.shields.io/npm/dm/nest-authz.svg?style=flat-square
[download-url]: https://npmjs.org/package/nest-authz

A access control library for [NestJS](https://nestjs.com/) which built on [node-casbin](https://github.com/casbin/node-casbin).

Casbin is a powerful and efficient open-source access control library. It provides support for enforcing authorization based on various access control models like ACL, RBAC, ABAC. For detailed info, check out the [official docs](https://casbin.org/)

## How to use

### Installation

```bat
$ npm install --save nest-authz
```

### Define Access Control Model

Firstly, you should create your own casbin access control model. Checkout [related docs](https://github.com/casbin/node-casbin#supported-models) if you have not.

### Initialization

Register nest-authz with options in the AppModule as follows:

```
AuthZModule.register(options)
```

`options` is an object literal containing options.

- `model` is a path string to the casbin model.
- `policy` is a path string to the casbin policy file or adapter
- `enablePossession` is a boolean that enables the use of possession (`AuthPossession.(ANY|OWN|OWN_ANY)`) for actions.
- `userFromContext` (REQUIRED) is a function that accepts `ExecutionContext`(the param of guard method `canActivate`) as the only parameter and returns the user as either string, object, or null. The `AuthZGuard` uses the returned user to determine their permission internally.
- `resourceFromContext` (OPTIONAL) is a function that accepts `ExecutionContext` and `PermissionData` and returns an `AuthResource`. This allows the `AuthZGuard` to perform access control on specific resources found in a request. When provided, this function is used as the default for all `Permissions` with `resourceFromContext: true`.
- `enforcerProvider` Optional enforcer provider
- `imports` Optional list of imported modules that export the providers which   are required in this module.

There are two ways to configure enforcer, either `enforcerProvider`(optional with `imports`) or `model` with `policy`

An example configuration which reads user and resource id from the http request.

```typescript
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthZModule.register({
      model: 'model.conf',
      policy: TypeORMAdapter.newAdapter({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'nestdb'
      }),
      userFromContext: (ctx) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user && request.user.username;
      },
      resourceFromContext: (ctx, perm) => {
        const request = ctx.switchToHttp().getRequest();
        return { type: perm.resource, id: request.id };
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService]
})
```

or

```typescript
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from './config.module';
import { AUTHZ_ENFORCER } from 'nest-authz';

@Module({
  imports: [
    ConfigModule,
    AuthZModule.register({
      imports: [ConfigModule],
      enforcerProvider: {
        provide: AUTHZ_ENFORCER,
        useFactory: async (configSrv: ConfigService) => {
          const config = await configSrv.getAuthConfig();
          return casbin.newEnforcer(config.model, config.policy);
        },
        inject: [ConfigService],
      },
      userFromContext: (ctx) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user && {
          username: request.user.username, 
          isAdmin: request.user.isAdmin 
        };
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService]
```

The latter method of configuring the enforcer is preferred.

### Checking Permissions

#### Using `@UsePermissions` Decorator

The `@UsePermissions` decorator is the easiest and most common way of checking permissions. Consider the method shown below:

```typescript
  @Get('users')
  @UseGuards(AuthZGuard)
  @UsePermissions({
    action: AuthActionVerb.READ,
    resource: 'USER',
    possession: AuthPossession.ANY
  })
  async findAllUsers() {}

```

The `findAllUsers` method can not be called by a user who is not granted the permission to read any user.

The value of property `resource` is a magic string just for demonstrating. In the real-world applications you should avoid magic strings. Resources should be kept in the separated file like `resources.ts`

The param of `UsePermissions` are some objects with required properties `action`, and `resource`, and optionally `possession`, and `isOwn`.

- `action` is an enum value of `AuthActionVerb`.
- `resource` is a resource string or object the request is accessing.
- `possession` is an enum value of `AuthPossession`. Defaults to `AuthPossession.ANY` if not defined.
- `isOwn` is a function that accepts `ExecutionContext`(the param of guard method `canActivate`) as the only parameter and returns boolean. The `AuthZGuard` uses it to determine whether the user is the owner of the resource. A default `isOwn` function which returns `false` will be used if not defined.
- `resourceFromContext` is either a boolean (which defaults to false) or a function that accepts `ExecutionContext` and `PermissionData` as parameters and returns an `AuthResource`. When set to true, the default `resourceFromContext` function provided during module initialization is used. When set to a function, the provided function will override the default `resourceFromContext` function. When set to false, undefined, or if a default `resourceFromContext` is not provided, the `resource` option will be used as-is for each request.

In order to support ABAC models which authorize based on arbitrary attributes in lieu of simple strings, you can also provide an object for the resource. For example:

```typescript
@UsePermissions({
  action: AuthActionVerb.READ,
  resource: {type: 'User', operation: 'single'},
  possession: AuthPossession.ANY
})
async userById(id: string) {}

@UsePermissions({
  action: AuthActionVerb.READ,
  resource: {type: 'User', operation: 'batch'},
  possession: AuthPossession.ANY
})
async findAllUsers() {}
```

To provide access control on specific resources, `resourceFromContext` can be used:  

```typescript
@UsePermissions({
  action: AuthActionVerb.READ,
  resource: 'User',
  resourceFromContext: (ctx, perm) => {
    const req = ctx.switchToHttp().getRequest();
    return { type: perm.resource, id: req.id };
  }
})
async userById(id: string) {}
```

You can define multiple permissions, but only when all of them satisfied, could you access the route. For example:

```
@UsePermissions({
  action: AuthActionVerb.READ,
  resource: 'USER_ADDRESS',
  possession: AuthPossession.ANY
}, {
  action; AuthActionVerb.READ,
  resource: 'USER_ROLES',
  possession: AuthPossession.ANY
})
```

Only when the user is granted both permissions of reading any user address and reading any roles, could he/she access the route.

#### Using `AuthzRBACService` or `AuthzManagementService`

While the `@UsePermissions` decorator is good enough for most cases, there are situations where we may want to check for a permission in a method's body. We can inject and use `AuthzRBACService` or `AuthzManagementService` which are wrappers of casbin api for that as shown in the example below:

```typescript
import { Controller, Get, UnauthorizedException, Req } from '@nestjs/common';
import {
  AuthZGuard,
  AuthZRBACService,
  AuthActionVerb,
  AuthPossession,
  UsePermissions
} from 'nest-authz';

@Controller()
export class AppController {
  constructor(private readonly rbacSrv: AuthZRBACService) {}

  @Get('users')
  async findAllUsers(@Req() request: Request) {
    let username = request.user['username'];
    // If there is a policy  `p, root, user, read:any` in policy.csv
    // then user `root` can do this operation

    // Using string literals for simplicity.
    const isPermitted = await this.rbacSrv.hasPermissionForUser(username, "user", "read:any");
    if (!isPermitted) {
      throw new UnauthorizedException(
        'You are not authorized to read users list'
      );
    }
    // A user can not reach this point if he/she is not granted for permission read users
    // ...
  }
}
```

## Example

For more detailed information, checkout the working example in
[nest-authz-example](https://github.com/node-casbin/nest-authz-example)

## License

This project is licensed under the MIT license.
