import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../users/user.schema';

export type BoardingDocument = Boarding & Document;

@Schema()
export class Boarding {
  @Prop()
  code: string;

  @Prop({ type: User, ref: 'User' })
  user: Types._ObjectId | User;
}

export const BoardingSchema = SchemaFactory.createForClass(Boarding);
