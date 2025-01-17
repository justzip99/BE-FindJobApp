import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { ApplicationModule } from './application/application.module';
import dbConfig from './config/db.config';
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig]
    }),
    TypeOrmModule.forRoot(dbConfig()),
    PostsModule,
    ApplicationModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
