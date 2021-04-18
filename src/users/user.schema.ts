import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: 1234,
    description: 'Amount distance in km',
  })
  @Prop()
  distance: number;

  @ApiProperty({
    example: 100,
    description: 'Amount flight hours',
  })
  @Prop()
  hours: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
