import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../posts/entities/post.entity';
import { IsOptional } from 'class-validator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @IsOptional()
  @Column({ nullable: true })
  description: string;

  @IsOptional()
  @Column({ nullable: true })
  skill: string;

  @IsOptional()
  @Column({ nullable: true })
  education: string;

  @IsOptional()
  @Column({ nullable: true })
  experience: string;

  @IsOptional()
  @Column({ nullable: true })
  language: string;

  @IsOptional()
  @Column({ nullable: true })
  resume: string;

  @IsOptional()
  @Column({ nullable: true })
  avatarURL: string;

  @Column({ default: 0 })
  balance: number;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
