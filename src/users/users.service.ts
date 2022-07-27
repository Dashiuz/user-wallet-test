import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './interfaces/users.interface';
import { UsersDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private usersModel: Model<Users>) {}

  async getAllUsersService(): Promise<Users[]> {
    return await this.usersModel.find();
  }

  async getUserByIdService(id: string): Promise<Users[]> {
    return await this.usersModel.findById(id);
  }

  async updateUserService(id: string, data: UsersDto): Promise<Users> {
    const updated = await this.usersModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updated;
  }

  async deleteUserService(id: string): Promise<Users> {
    const deleted = await this.usersModel.findByIdAndDelete(id);
    return deleted;
  }
}
