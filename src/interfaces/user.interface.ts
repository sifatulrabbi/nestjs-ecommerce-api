export interface IUser {
  _id?: string;
  email: string;
  password: string;
  name: string;
  shop_name?: string;
  shop_id?: string;
}

export type IUserPreview = Pick<
  IUser,
  '_id' | 'email' | 'name' | 'shop_name' | 'shop_id'
>;

export interface IUserSession {
  id: string;
}
