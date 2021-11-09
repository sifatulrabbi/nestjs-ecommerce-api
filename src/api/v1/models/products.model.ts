import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IProduct } from 'src/interfaces';

export type ProductsDocument = Products & mongoose.Document;

@Schema({ timestamps: true })
export class Products implements IProduct {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  desc: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  shop: mongoose.ObjectId;

  @Prop({ type: [String] })
  tags?: string[];
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
