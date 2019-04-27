import { Controller, Get } from '@nestjs/common';

import { Resources } from '../resources';

@Controller()
export class AppController {
  @Get()
  root() {
    return 'Hello World!';
  }

  @Get('/resources')
  resources() {
    return Resources;
  }
}
