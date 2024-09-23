import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";

export default (): TypeOrmModuleOptions  => ({
  type: 'mysql',
  host: process.env.MYSQL_URL,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_NAME,
  entities: [User],
  synchronize: false,
});
