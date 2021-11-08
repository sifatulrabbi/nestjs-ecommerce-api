import { IShop } from 'src/typings';
import { shopsModel, categoriesModel } from '../common';

export const updateCatsProductsList = async (shop: IShop): Promise<void> => {
  try {
    shop.categories.map(async (name: string) => {
      const category = await categoriesModel.findOne({ name });
      const newProducts = [...category.products];

      if (shop.products.length === 0) return;
      shop.products.map((id: string) => newProducts.push({ id }));

      category.update({ products: newProducts });
    });
  } catch (err) {
    throw {
      message: 'unable to add products to the categories list',
      error: err,
    };
  }
};
