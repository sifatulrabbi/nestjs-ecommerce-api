import { IShop } from 'src/typings';
import { updateCatsProductsList } from './updateCatsProductsList';
import { updateCatsShopsList } from './updateCatsShopsList';

/**
 * @param shop
 * @if the shop has one or more categories @then calls @function updateCatsShopsList() with @arg shop
 * @if the shop has one or more products @then calls @function updateCatsProductsList() with @arg shop
 * @i
 */

export const updateCatsList = async (shop: IShop): Promise<void> => {
  try {
    if (shop.categories && shop.categories.length > 0) {
      await updateCatsShopsList(shop);
    }
    if (shop.products && shop.products.length > 0) {
      await updateCatsProductsList(shop);
    }
  } catch (err) {
    console.log({
      message: 'unable to update categories lists',
      error: err,
    });
  }
};
