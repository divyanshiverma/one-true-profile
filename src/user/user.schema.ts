import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
export const UPDATEABLE_USER_FIELDS = [
  'firstName',
  'lastName',
  'city',
  'state',
  'country',
  'photo',
]
@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop()
  photo: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
