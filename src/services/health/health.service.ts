import { Request, Response } from 'express';

export class HealthService {
    healthGet(req: Request, res: Response): void {
        res.status(200).json({ message: 'OK' });
    }

    healthPost(req: Request, res: Response): void {
        res.status(200).json({ message: 'OK' });
    }
}
