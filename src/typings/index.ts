export interface IUser {
  _id?: string;
  name: string;
  fullName: string;
  email: string;
  password: string;
  photoURL?: string;
  shopId?: string;
  shopName?: string;
}

export interface IShop {
  _id?: string;
  name: string;
  owner: string;
  ownerId: string;
  categories?: string[];
  desc?: string;
  products?: string[];
  coverURL?: string;
}

export interface ICategory {
  _id?: string;
  name: string;
  products: [{ id: string }];
  shops: [{ id: string }];
}

export interface IProduct {
  _id?: string;
  name: string;
  desc: string;
  price: number;
  photoURL?: string;
  shopId: string;
  category: string;
  tags: string[];
}

export interface ITag {
  _id?: string;
  name: string;
}
