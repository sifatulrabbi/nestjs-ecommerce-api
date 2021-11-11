import { IShop } from 'src/typings';
import { categoriesModel } from '../common';
/**
 *
 */
export const updateCatsShopsList = async (shop: IShop): Promise<void> => {
  try {
    shop.categories.map(async (name: string) => {
      const category = await categoriesModel.findOne({ name });
      const newShops = [...category.shops, { id: shop._id }];
      await category.update({ shops: newShops });
    });
  } catch (err) {
    throw { message: 'unable to add shops to the categories list', error: err };
  }
};
