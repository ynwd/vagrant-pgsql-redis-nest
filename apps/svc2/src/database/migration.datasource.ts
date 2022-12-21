import { DataSource, DataSourceOptions } from 'typeorm';
import { dataSourceOptions } from './database.config';

export const MigrationDatasource = new DataSource({
  ...dataSourceOptions,
  // module entity autoload
  entities: [`${__dirname}'/../**/*.entity.{ts,js}`],
  // is used to execute typeorm-cli
  // check package.json script
  migrationsRun: true,
  migrations: ['src/database/migrations/**/*.ts'],
} as DataSourceOptions);
