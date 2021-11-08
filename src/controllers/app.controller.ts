import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('/')
export class AppController {
  @ApiOkResponse()
  @Get('/health')
  healthGet(): string {
    return 'hello world';
  }
}
