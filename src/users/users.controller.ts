import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';
import { Users } from './interfaces/users.interface';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/helpers/local-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiOkResponse({ description: 'Users retrieved successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized, login first' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getAllUsers(): Promise<Users[]> {
    return await this.userService.getAllUsersService();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User retrieved successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized, login first' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getUserById(@Param('id') id: string): Promise<Users[]> {
    const user = await this.userService.getUserByIdService(id);
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }

  @Put('update/:id')
  @ApiOkResponse({ description: 'User updated successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized, login first' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: UsersDto })
  async updateUser(@Body() data: UsersDto, @Param('id') id: string) {
    const updatedUser = await this.userService.updateUserService(id, data);
    if (!updatedUser) throw new NotFoundException('User not found.');
    return updatedUser;
  }

  @Delete('/delete/:id')
  @ApiOkResponse({ description: 'User deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized, login first' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async deleteUser(@Param('id') id: string): Promise<Users> {
    const deletedUser = await this.userService.deleteUserService(id);
    if (!deletedUser) throw new NotFoundException('User not found.');
    return deletedUser;
  }
}
