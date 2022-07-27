import { Document } from 'mongoose';

export interface Users extends Document {
  fullname: string;
  email: string;
  password: string;
  dni: number;
  address: string;
}
