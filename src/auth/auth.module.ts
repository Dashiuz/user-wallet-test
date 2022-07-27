import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './helpers/jwt.strategy';
import { ConfigType } from '@nestjs/config';
import config from '../config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: userSchema }]),
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.JWT_SECRET_KEY,
          signOptions: { expiresIn: '24h' },
        };
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
