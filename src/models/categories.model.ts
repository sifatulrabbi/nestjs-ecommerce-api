import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ICategory } from '../interfaces';

export type CategoriesDocument = Categories & mongoose.Document;

@Schema({ timestamps: true })
export class Categories implements ICategory {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId] })
  shops?: mongoose.ObjectId[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId] })
  products?: mongoose.ObjectId[];
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
