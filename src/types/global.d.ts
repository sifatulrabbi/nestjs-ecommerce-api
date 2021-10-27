declare interface IUser {
  _id?: string;
  name: string;
  full_name: string;
  email: string;
  password: string;
  photoURL?: string;
  shop_id?: string;
  shop_name?: string;
}

declare interface IShop {
  _id?: string;
  name: string;
  owner_id: string;
  owner: string;
  categories: string[];
  desc?: string;
  items?: string[];
  coverURL?: string;
}

declare interface IProduct {
  _id?: string;
  name: string;
  desc: string;
  price: string;
  photoURL?: string;
  shop_id: string;
  category: string;
  tags: string[];
}

declare interface ICategory {
  _id?: string;
  name: string;
}

declare interface ITag {
  _id?: string;
  name: string;
}
