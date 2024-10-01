import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Post } from '../posts/entities/post.entity';
import { Application } from '../application/entities/application.entity';
import { ApplicationPost } from '../application/entities/application-post.entity';

export default (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: process.env.MYSQL_URL,
  port: Number(process.env.MYSQL_PORT || '3306'),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_NAME,
  entities: [User, Post, Application, ApplicationPost],
});
