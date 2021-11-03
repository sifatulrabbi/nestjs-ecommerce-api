import { shopsModel } from '../models';
import { IShop } from 'src/typings';

export const getUserShop = async (id: string): Promise<IShop | null> => {
  const shop = await shopsModel.findById(id);

  if (shop) {
    return shop;
  } else {
    return null;
  }
};
