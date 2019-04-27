import { ExecutionContext } from '@nestjs/common';

export interface AuthZModuleOptions<T = any> {
  model: string;
  policy: string | Promise<T>;
  usernameFromContext: (context: ExecutionContext) => string;
}
