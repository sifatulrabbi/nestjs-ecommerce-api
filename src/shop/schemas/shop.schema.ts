import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShopDocument = Shop & Document;

@Schema({ timestamps: true })
export class Shop implements IShop {
  @Prop({ required: true })
  name: string;

  @Prop()
  desc?: string;

  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  categories: string[];

  @Prop()
  items?: string[];
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
