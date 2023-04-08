import { Injectable } from '@nestjs/common';
import { Otp, OtpDocument, OtpSchema } from './otp.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Otp.name) private otpModel: Model<OtpDocument>) {}

  async sendOTP(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000)
    console.log(otp)
    await this.otpModel.findOneAndDelete({email})
    const a = await this.otpModel.create({email, otp})
    console.log(a)
  }
}
