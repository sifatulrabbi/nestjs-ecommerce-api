import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticatedGuard } from './guards';
import { AppService } from './app.service';
import { IUser } from 'src/interfaces';

@Controller({ version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res: Response): void {
    this.appService.getHello(res);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  async getProtectedHello(@Req() req: Request): Promise<IUser> {
    return req.user as IUser;
  }
}
