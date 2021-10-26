import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class VerifyInputsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (
      !req.body.username ||
      !req.body.full_name ||
      !req.body.email ||
      !req.body.password
    ) {
      res.status(404).json({
        statusCode: 404,
        message: 'Required fields: username, full_name, email, password',
        error: 'invalid inputs',
      });
      return;
    }
    next();
  }
}
