import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_URL || 'localhost',
  port: Number(process.env.MYSQL_PORT || '3307'),
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.MYSQL_NAME || 'FindJob',
  entities: ['../**/*.entity.{ts,js}'],
  migrations: ['./build/migration/*.{ts,js}'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
