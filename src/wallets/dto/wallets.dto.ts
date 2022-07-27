import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class WalletsDto {
  @ApiProperty({ type: String, description: 'Mongodb user identifier' })
  userID: mongoose.Types.ObjectId;

  @ApiProperty({ type: String, description: 'Current USD balance' })
  balanceUSD: string;

  @ApiProperty({ type: String, description: 'Current COP balance' })
  balanceCOP: string;
}
