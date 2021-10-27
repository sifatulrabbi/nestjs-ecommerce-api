import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidateData implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (
      req.body.name &&
      req.body.user_id &&
      req.body.username &&
      req.body.categories
    ) {
      next();
    } else {
      res.status(404).json({
        statusCode: 404,
        message: 'Provide required fields',
        error: 'incorrect credentials',
      });
    }
  }
}
