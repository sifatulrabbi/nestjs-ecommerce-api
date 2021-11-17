import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IShop } from 'src/interfaces';

export type ShopsDocument = Shops & Document;

@Schema({ timestamps: true })
class Shops implements IShop {
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  desc!: string;

  @Prop({ required: true })
  owner_id!: string;

  @Prop({ required: true })
  owner_name!: string;

  @Prop({ type: [String], required: true })
  categories!: string[];

  @Prop([String])
  products?: string[];
}

export const ShopsSchema = SchemaFactory.createForClass(Shops);
