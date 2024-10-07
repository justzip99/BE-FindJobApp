import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../posts/entities/post.entity';
import { IsOptional } from 'class-validator';
import { Application } from '../application/entities/application.entity';

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
  @Column({ type: 'varchar', length: 1000, nullable: true })
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

  @Column({ nullable: true })
  avatarURL: string;

  @Column({ type: 'decimal', precision: 10, default: 0 })
  balance: number;

  @Column({ type: 'json', nullable: true })
  location: {
    address: string;
    province: string;
    district: string;
    lat: number;
    lng: number;
  };

  @OneToMany(() => Application, (application) => application.user)
  applications: Application[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
