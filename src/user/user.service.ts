import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getOrCreateUser(email: string): Promise<UserDocument> {
    const existing = await this.userModel.findOne({email})
    if(existing) return existing;
    return await this.userModel.create({email})
  }
}
