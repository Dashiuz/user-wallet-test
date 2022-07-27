import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class RechargeWalletDto {
  @ApiProperty({ type: String, description: 'Mongodb wallet identifier' })
  walletID: mongoose.Types.ObjectId;

  @ApiProperty({ type: String, description: 'Currency type COP or USD' })
  coinType: string;

  @ApiProperty({ type: String, description: 'Amount desired to add' })
  balance: string;
}
