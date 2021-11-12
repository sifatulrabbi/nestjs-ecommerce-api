export interface IUser {
  _id?: string;
  email: string;
  password: string;
  name: string;
  shop_name?: string;
  shop_id?: string;
}

export type IUserPreview = Pick<IUser, 'email' | 'name' | 'shop_name'>;
