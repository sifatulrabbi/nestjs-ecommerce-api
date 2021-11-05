import { Request, Response, NextFunction } from 'express';

export const userShopVerification = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if ((res.locals.user.shopId, req.params.shopid)) {
      next();
    } else {
      res.status(401).json({ message: "user and shop didn't match" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
