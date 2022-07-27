import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsDto } from './dto/wallets.dto';
import { RechargeWalletDto } from './dto/recharge.dto';
import { Wallets } from './interfaces/wallets.interface';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/helpers/local-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('wallet')
@Controller('wallets')
export class WalletsController {
  constructor(private walletService: WalletsService) {}

  @Get()
  @ApiOkResponse({ description: 'Wallets retrieved successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getAllWallets(): Promise<Wallets[]> {
    return await this.walletService.getAllWalletsService();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Wallet retrieved successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized, login first' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getWalletById(@Param('id') id: string): Promise<Wallets[]> {
    const wallet = await this.walletService.getWalletByIdService(id);
    if (!wallet) throw new NotFoundException('Wallet not found.');
    return wallet;
  }

  @Post('create-wallet')
  @ApiResponse({ status: 201, description: 'Wallet created' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized, login first' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: WalletsDto })
  async createWallet(@Body() data: WalletsDto): Promise<Wallets> {
    return await this.walletService.createWalletservice(data);
  }

  @Put('update/:id')
  @ApiOkResponse({ description: 'Wallet updated successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized, login first' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: WalletsDto })
  async updateWallet(@Body() data: WalletsDto, @Param('id') id: string) {
    const updatedWallet = await this.walletService.updateWalletservice(
      id,
      data,
    );
    if (!updatedWallet) throw new NotFoundException('Wallet not found.');
    return updatedWallet;
  }

  @Delete('delete/:id')
  @ApiOkResponse({ description: 'Wallet deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized, login first' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async deleteWallet(@Param('id') id: string): Promise<Wallets> {
    const deletedWallet = await this.walletService.deleteWalletservice(id);
    if (!deletedWallet) throw new NotFoundException('Wallet not found.');
    return deletedWallet;
  }

  @Post('recharge-wallet')
  @ApiResponse({ status: 201, description: 'Balance updated' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized, login first' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: RechargeWalletDto })
  async rechargeWallet(@Body() data: RechargeWalletDto): Promise<Wallets> {
    return await this.walletService.rechargeWalletService(data);
  }
}
