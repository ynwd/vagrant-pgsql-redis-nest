import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config();
export const dataSourceOptions: DataSourceOptions = {
  type: <any>process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'vagrant',
  logging: <any>process.env.DB_LOGGING || 'all',
  synchronize: process.env.DB_SYNC === 'true' ? true : false,
};
