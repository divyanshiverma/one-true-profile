import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UPDATEABLE_USER_FIELDS, User, UserDocument } from './user.schema';
var _ = require('lodash');
import { City, CityDocument } from './city.schema';
import * as utils from '../utils/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(City.name) private cityModel: Model<CityDocument>,
  ) {}

  async getOrCreateUser(email: string): Promise<UserDocument> {
    const existing = await this.userModel.findOne({email})
    if(existing) return existing;
    return await this.userModel.create({email})
  }

  async getById(userId: string): Promise<UserDocument> {
    return await this.userModel.findById(userId)
  }

  async getByIdAndUpdate(userId: string, data: any) {
    const user = await this.getById(userId)
    const filteredData = _.pick(data, UPDATEABLE_USER_FIELDS)
    if (filteredData.firstName) {
      if(filteredData.firstName === "") throw Error("first name cannot be empty");
      if(filteredData.firstName.length > 40) throw Error("first name cannot be more than 40 characters");
    }
    if (filteredData.lastName) {
      if(filteredData.lastName === "") throw Error("last name cannot be empty");
      if(filteredData.lastName.length > 40) throw Error("last name cannot be more than 40 characters");
    }
    const city = filteredData.city || user.city;
    const state = filteredData.state || user.state;
    const country = filteredData.country || user.country;
    const placeKnown = await this.cityModel.find({city, state, country})
    if (!placeKnown) throw Error("Enter valid location")

    if (filteredData.photo) {
      const size = utils.byteSize(filteredData.photo)
      if (size > 5 * 1024 * 1024) throw Error("file size larger than 5 MB")
    }

    return await this.userModel.findByIdAndUpdate(userId, filteredData, {new:true})
  }
}
