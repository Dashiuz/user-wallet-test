import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Wallets } from './interfaces/wallets.interface';
import { RechargeWalletDto } from './dto/recharge.dto';
import { WalletsDto } from './dto/wallets.dto';
import axios from 'axios';
import { ConfigType } from '@nestjs/config';
import config from '../config';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel('wallets') private walletsModel: Model<Wallets>,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async getAllWalletsService(): Promise<Wallets[]> {
    const wallets = await this.walletsModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userID',
          foreignField: '_id',
          as: 'userData',
        },
      },
      { $unwind: '$userData' },
    ]);

    return wallets;
  }

  async getWalletByIdService(id: string): Promise<Wallets[]> {
    const wallet = await this.walletsModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userID',
          foreignField: '_id',
          as: 'userData',
        },
      },
      { $unwind: '$userData' },
      {
        $match: {
          $or: [
            { userID: new mongoose.mongo.ObjectId(id) },
            { _id: new mongoose.mongo.ObjectId(id) },
          ],
        },
      },
    ]);

    return wallet;
  }

  async createWalletservice(data: WalletsDto): Promise<Wallets> {
    let objID = new mongoose.mongo.ObjectId(data.userID);
    const result = {
      userID: objID,
      balanceCOP: data.balanceCOP,
      balanceUSD: data.balanceUSD,
    };
    const newWallet = new this.walletsModel(result);
    return await newWallet.save();
  }

  async updateWalletservice(id: string, data: WalletsDto): Promise<Wallets> {
    data.userID = new mongoose.Types.ObjectId(data.userID);
    const updated = await this.walletsModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updated;
  }

  async deleteWalletservice(id: string): Promise<Wallets> {
    const deleted = await this.walletsModel.findByIdAndDelete(id);
    return deleted;
  }

  async rechargeWalletService(data: RechargeWalletDto): Promise<any> {
    let newBalanceUSD = undefined;
    let newBalanceCOP = undefined;
    let conversion = undefined;
    const coinType = data.coinType;
    const base = 'USD';
    const url = `https://api.apilayer.com/exchangerates_data/latest?symbols=${coinType}&base=${base}`;

    const walletInfo = await this.getWalletByIdService(
      data.walletID.toString(),
    );

    if (walletInfo.length <= 0)
      throw new HttpException('Wallet info not found', 404);

    let balanceUSD = walletInfo[0].balanceUSD;

    console.log(balanceUSD, data.balance);

    let response = await axios.get(url, {
      headers: { apikey: this.configService.API_KEY },
    });

    if (!response) throw new HttpException('Unable to retrieve rates', 400);

    const apidata = response.data;

    if (coinType.toUpperCase() === 'COP') {
      conversion = parseFloat(data.balance) / apidata.rates.COP;
      newBalanceUSD = parseFloat(balanceUSD) + parseFloat(conversion);
      newBalanceCOP = newBalanceUSD * apidata.rates.COP;
    } else if (coinType.toUpperCase() === 'USD') {
      newBalanceUSD = parseFloat(balanceUSD) + parseFloat(data.balance);
      newBalanceCOP = parseFloat(newBalanceUSD) * apidata.rates.COP;
    } else {
      throw new HttpException('Invalid coin type. Must be USD or COP', 400);
    }

    let obj: WalletsDto = {
      userID: new mongoose.Types.ObjectId(walletInfo[0].userID),
      balanceCOP: (
        Math.round((newBalanceCOP + Number.EPSILON) * 100) / 100
      ).toFixed(2),
      balanceUSD: (
        Math.round((newBalanceUSD + Number.EPSILON) * 100) / 100
      ).toFixed(2),
    };

    const updated = await this.walletsModel.findByIdAndUpdate(
      data.walletID,
      obj,
      {
        new: true,
      },
    );

    return updated;
  }
}
