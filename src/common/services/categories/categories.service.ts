import { NextFunction, Request, Response } from 'express';
import { ICategory, IShop } from 'src/typings';
import { categoriesModel } from '../../models';

class CategoriesService {
  private async createCategories(name: string): Promise<ICategory> {
    try {
      const newCategory = new categoriesModel({ name });
      const createdCategory = newCategory.save();

      return createdCategory;
    } catch (err) {
      throw { message: 'unable to create categories', error: err };
    }
  }

  public async checkShopCategories(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const shop = req.body.shop;
      shop.categories.map(async (name: string) => {
        const category = await categoriesModel.findOne({ name });

        if (!category) {
          this.createCategories(name);
        }
      });
      next();
    } catch (err) {
      res.status(500).json({
        message: 'unable to check categories',
        error: err,
      });
    }
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const categories = await categoriesModel.find({});
      res.status(200).json({ message: 'success', data: categories });
    } catch (err) {
      res.status(404).json({ message: 'categories not found', error: err });
    }
  }
}

export const categoriesService = new CategoriesService();
