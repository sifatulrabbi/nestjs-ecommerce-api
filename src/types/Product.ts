export interface IProduct {
  _id?: string;
  name: string;
  desc: string;
  price: string;
  photoURL?: string;
  shop_id: string;
  category: string;
  tags: string[];
}
