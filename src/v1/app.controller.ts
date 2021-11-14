import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './guards';
import { AppService } from './app.service';

@Controller({ version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res: Response) {
    this.appService.getHello(res);
  }

  @UseGuards(LocalAuthGuard)
  @Post('protected')
  async getProtectedHello(@Req() req: Request): Promise<any> {
    return req.user;
  }
}
