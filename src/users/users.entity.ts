import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../posts/entities/post.entity';
import { IsOptional } from 'class-validator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @IsOptional()
  @Column({ nullable: true })
  resume: string;

  @Column({ default: 0 })
  balance: number;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
