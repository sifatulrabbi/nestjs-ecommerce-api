export interface IShop {
  _id?: string;
  name: string;
  owner_id: string;
  owner: string;
  categories: string[];
  desc?: string;
  items?: string[];
  coverURL?: string;
}
