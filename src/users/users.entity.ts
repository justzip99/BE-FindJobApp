import { Exclude } from 'class-transformer';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Post } from '../posts/entities/post.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    userName: string;

    @Column({unique: true})
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    resume: string;

    @Column()
    balance: number;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]
}