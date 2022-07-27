import { Document } from 'mongoose';

export interface Wallets extends Document {
  id?: number;
  userID: string;
  balanceUSD: string;
  balanceCOP: string;
}
