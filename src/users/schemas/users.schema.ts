import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema({ timestamps: true })
export class Users implements IUser {
  @Prop({ required: true, unique: true, type: String })
  username: string;

  @Prop({ required: true, type: String })
  full_name: string;

  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ type: String })
  shop_id?: string;

  @Prop({ type: String })
  shop_name?: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
