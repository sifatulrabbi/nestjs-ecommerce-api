import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IProduct } from 'src/interfaces';

export type ProductsDocument = Products & Document;

@Schema({ timestamps: true })
class Products implements IProduct {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  desc!: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ required: true })
  category!: string;

  @Prop({ type: [String] })
  tags?: string[];

  @Prop({ required: true })
  shop_id!: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
