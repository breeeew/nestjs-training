import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUsers() {
    return this.userModel.find().exec();
  }

  async createUser(dto: CreateUserDto) {
    return this.userModel.create(dto);
  }

  async createMockUsers() {
    const names = [
      'John Doe',
      'Artem Sitnikov',
      'Valery Zaitsev',
      'Abdulla Bayramov',
      'Artem Gorokhov',
      'Alexandr Bulyga',
    ];

    for (const name of names) {
      await this.userModel.create({
        name,
        distance: Math.floor(Math.random() * 10000),
        hours: Math.floor(Math.random() * 1000),
      });
    }

    return this.getAllUsers();
  }
}
