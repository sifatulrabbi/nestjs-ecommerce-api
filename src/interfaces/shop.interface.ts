export interface IShop {
  _id?: string;
  name: string;
  desc: string;
  owner_id: string;
  categories: string[];
  products?: string[];
}
