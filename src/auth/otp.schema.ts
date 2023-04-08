import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Document } from 'mongoose';

export type OtpDocument = Otp & Document;

@Schema({ timestamps: true })
export class Otp {
  @Prop({ required: true, unique: true })
  email: string;
  
  @Prop({ required: true })
  otp: number;
  
  @Prop({default: now()})
  createdAt: Date;
  
  @Prop({default: now()})
  updatedAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
