import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from './guards';

@Controller({ version: '1' })
export class AppController {
  @Get()
  getHello(): string {
    return `Hello world`;
  }

  @UseGuards(LocalAuthGuard)
  @Post('protected')
  async getProtectedHello(@Req() req: Request): Promise<any> {
    return req.user;
  }
}
