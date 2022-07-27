import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDto } from '../users/dto/users.dto';
import { Users } from '../users/interfaces/users.interface';
import { LoginDto } from './dto/login.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('users') private usersModel: Model<Users>,
    private jwtService: JwtService,
  ) {}

  async loginService(data: LoginDto): Promise<any> {
    const { email, password } = data;
    const user: Users = await this.usersModel.findOne({ email });

    if (!user) throw new HttpException('User not found', 404);

    const validatePass = await compare(password, user.password);

    if (!validatePass) throw new HttpException('Invalid password', 401);

    const payload = { id: user._id, name: user.fullname };
    const token = this.jwtService.sign(payload);

    const result = {
      user: user,
      token,
    };

    return result;
  }

  async createUserService(data: UsersDto): Promise<Users> {
    const password = data.password;
    const encriptedPass = await hash(password, 9);
    data = { ...data, password: encriptedPass };
    const newUser = new this.usersModel(data);
    return await newUser.save();
  }
}
