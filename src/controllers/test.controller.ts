import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

const namespace = 'TEST ROUTER';

/**
 * @description getting test
 * @route GET /api/v1/test
 * @access public
 */
async function gettingTest(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        res.status(200).json({ message: 'GET is working' });
        logger.error({
            namespace,
            status: 500,
            message: 'GET is working',
        });
    } catch (err) {
        res.status(500).json({ message: err });
        logger.error({
            namespace,
            status: 500,
            message: `${err}`,
        });
    }
}

/**
 * @description posting test
 * @route POST /api/v1/test
 * @access public
 */
async function postingTest(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        res.status(200).json({ message: 'POST is working' });
        logger.error({
            namespace,
            status: 500,
            message: 'POST is working',
        });
    } catch (err) {
        res.status(500).json({ message: err });
        logger.error({
            namespace,
            status: 500,
            message: `${err}`,
        });
    }
}

export default { gettingTest, postingTest };
