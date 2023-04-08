import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CityDocument = City & Document;

@Schema()
export class City {
  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;
}

export const CitySchema = SchemaFactory.createForClass(City);
