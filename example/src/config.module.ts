import { Module } from '@nestjs/common';

import { ConfigService } from './services';

@Module({
  imports: [],
  controllers: [],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
