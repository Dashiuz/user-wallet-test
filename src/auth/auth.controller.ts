import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UsersDto } from '../users/dto/users.dto';
import { Users } from '../users/interfaces/users.interface';
import { Login } from './interfaces/login.interface';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 201, description: 'User logged in' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: LoginDto })
  async login(@Body() data: LoginDto): Promise<Login> {
    return await this.authService.loginService(data);
  }

  @Post('create-user')
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: UsersDto })
  async createUser(@Body() data: UsersDto): Promise<Users> {
    return await this.authService.createUserService(data);
  }
}
