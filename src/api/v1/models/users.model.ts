import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IUser } from '../../../interfaces';

export type UsersDocument = Users & mongoose.Document;

@Schema({ timestamps: true })
export class Users implements IUser {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  full_name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: mongoose.Types.ObjectId })
  shop_id?: mongoose.ObjectId;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
