import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser } from 'src/interfaces';

export type UsersDocument = Users & Document;

@Schema({ timestamps: true })
class Users implements IUser {
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true })
  name!: string;

  @Prop()
  shop_name?: string;

  @Prop()
  shop_id?: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
