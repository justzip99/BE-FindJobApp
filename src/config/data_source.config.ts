import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_URL,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_NAME,
  entities: ['../**/*.entity.{ts,js}'],
  migrations: ['./build/migration/*.{ts,js}'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
