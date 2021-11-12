import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from './auth';

@Controller({ version: '1' })
export class AppController {
  @Get()
  getHello(): string {
    return `Hello world`;
  }

  @UseGuards(LocalAuthGuard)
  @Get('protected')
  async getProtectedHello(@Req() req: Request): Promise<string> {
    console.log(req.user);
    return `Protected Hello world`;
  }
}
