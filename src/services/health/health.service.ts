import { Request, Response } from 'express';

export class HealthService {
    get(req: Request, res: Response): void {
        res.status(200).json({
            message: 'OK',
        });
    }
}
