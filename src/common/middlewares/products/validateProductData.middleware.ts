import { Request, Response, NextFunction } from 'express';

export const validateProductData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const errors: string[] = [];
    const product = req.body.product;

    if (!req.body.product) {
      errors.push('add products');
    } else {
      if (!product.name && typeof product.name !== 'string') {
        errors.push('Name is required');
      }
      if (!product.price && typeof product.price !== 'number') {
        errors.push('Price is required');
      }
      if (!product.desc && typeof product.desc !== 'string') {
        errors.push('Description is required');
      }
      if (!product.category && typeof product.category !== 'string') {
        errors.push('Category is required');
      }
      if (!product.tags) {
        errors.push('Tags are required');
      }
      if (!product.shopId && typeof product.shopId !== 'string') {
        errors.push('Shop id is required');
      }
    }

    if (errors.length > 0) {
      res.status(404).json({ error: errors });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: 'internal error in validate products',
      error: err,
    });
  }
};
