import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';
import userModel from '../models/user.model';

class UserController {
  namespace = 'USER CONTROLLER';

  error(message?: string): void {
    logger.error({
      namespace: this.namespace,
      status: 500,
      message: message ? message : 'Server error',
    });
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
    } catch (err) {
      this.error(err as string);
    }
  }
}

export default new UserController();
