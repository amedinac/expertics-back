import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop()
  serial: string;

  @Prop()
  description: string;

  @Prop()
  coverage: string;

  @Prop()
  vmi: string;

  @Prop()
  fail: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
