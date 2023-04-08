import { Injectable } from '@nestjs/common';
import { Otp, OtpDocument, OtpSchema } from './otp.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Otp.name) private otpModel: Model<OtpDocument>) {}

  async sendOTP(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000)
    console.log(otp)
    await this.otpModel.findOneAndDelete({email})
    await this.otpModel.create({email, otp})
  }

  async verifyOTP(email: string, otp: number): Promise<boolean> {
    const storedOTP = await this.otpModel.findOne({email})
    if (!storedOTP) return false;
    if (otp != storedOTP.otp) return false;
    const expiryOfOTP = moment(storedOTP.createdAt).add(1, "hours")
    if (moment().isAfter(expiryOfOTP)) return false;
    await this.otpModel.findOneAndDelete({email})
    return true;
  }
}
