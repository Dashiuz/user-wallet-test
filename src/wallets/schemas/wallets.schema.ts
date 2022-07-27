import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Wallet {
  @Prop({ type: mongoose.Types.ObjectId, require: true })
  userID: mongoose.Types.ObjectId;

  @Prop({ type: String, require: true })
  balanceUSD: string;

  @Prop({ type: String, require: true })
  balanceCOP: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const walletSchema = SchemaFactory.createForClass(Wallet);
