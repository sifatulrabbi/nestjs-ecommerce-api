export interface IShop {
  _id?: string;
  email: string;
  name: string;
  desc: string;
  owner_id: string;
  owner_name: string;
  categories: string[];
  products?: string[];
}
