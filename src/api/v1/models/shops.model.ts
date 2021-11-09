import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IShop } from '../../../interfaces';

export type ShopsDocument = Shops & mongoose.Document;

@Schema({ timestamps: true })
export class Shops implements IShop {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  desc: string;

  @Prop({ type: [String], required: true })
  categories: string[];

  @Prop({ type: mongoose.Types.ObjectId })
  owner_id: mongoose.ObjectId;

  @Prop({ type: [mongoose.Types.ObjectId] })
  products?: mongoose.ObjectId[];
}

export const ShopsSchema = SchemaFactory.createForClass(Shops);
