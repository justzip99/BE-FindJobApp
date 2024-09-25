import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_URL,
  port: 3307,
  username: 'root',
  password: 'root',
  database: 'FindJob',
  entities: ['../**/*.entity.{ts,js}'],
  migrations: [
    '/home/hieudm1/Documents/Code Project/Nest-learning/FIndJobApp/build/migration/*.{ts,js}',
  ],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
