import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { walletSchema } from './schemas/wallets.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'wallets', schema: walletSchema }]),
  ],
  controllers: [WalletsController],
  providers: [WalletsService],
})
export class WalletsModule {}
