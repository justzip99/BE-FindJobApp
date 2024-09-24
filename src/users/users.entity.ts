import { Exclude } from 'class-transformer';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

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
}