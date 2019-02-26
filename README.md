# nest-authz

基于 node-casbin 实现的 RBAC 权限控制模块。

## 如何使用

```typescript
// app.module.ts
@Module({
  imports: [
    AuthZModule.register({
      model: 'model.conf',
      policy: 'policy.csv'
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
```

其中 `policy` 也可以为 adapter， 如:

```typescript
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthZModule.register({
      model: 'model.conf',
      policy: TypeORMAdapter.newAdapter({
        name: 'casbin',
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'nestdb'
      })
    }),
  ],
  controllers: [AppController],
  providers: [AppService]
})
```

```typescript
// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  AuthZGuard,
  AuthZService,
  AuthAction,
  AuthPossession,
  UsePermissions
} from 'nest-authz';

@Controller()
export class AppController {
  constructor(
    private readonly authzSrv: AuthZService, // 对 enforcer api 的封装
    private readonly appService: AppService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 只有对用户有任意访问权限的用户才可以读取用户列表
  @Get('users')
  @UseGuards(AuthZGuard)
  @UsePermissions({
    action: AuthAction.READ,
    resource: 'USER', // 此处为演示使用的 magic string， 其值建议使用变量获取
    possession: AuthPossession.ANY
  })
  async findAllUsers() {
    // your code
  }

  @Get(':id/roles')
  @UseGuards(AuthZGuard)
  @UsePermissions({
    action: AuthAction.READ,
    resource: 'USER_ROLES',
    possession: AuthPossession.OWN_ANY, // 只有对此资源拥有所有权或者任意权限的用户才可以访问
    isOwn: (req: any): boolean => {
      // 用户可以添加自定义函数 isOwn， 判别用户是否拥有该资源的所有权
      return Number(req.user.id) === Number(req.params.id);
    }
  })
  async findUserRoles(@Param('id') id: string): Promise<string[]> {
    return this.authzSrv.getRolesForUser(username);
  }
}
```

一般来说，认证后的用户数据保存于请求对象的 `user` 属性中。
AuthGuard 使用从请求对象 `user` 属性中获取到的 `username` 属性判别用户权限。
