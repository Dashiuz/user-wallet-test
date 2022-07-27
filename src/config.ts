import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    DB_INSTANCE: process.env.DB_INSTANCE,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    API_KEY: process.env.API_KEY,
  };
});
