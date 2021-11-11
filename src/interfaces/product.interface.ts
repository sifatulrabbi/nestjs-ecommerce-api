export interface IProduct {
  _id?: string;
  name: string;
  desc: string;
  price: number;
  shop_id: string;
  category: string;
  tags?: string[];
}
