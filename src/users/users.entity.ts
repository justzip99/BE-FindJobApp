import { Optional } from '@nestjs/common';
import { Order } from 'src/orders/orders.entity';
import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    userName: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column(Optional)
    address: string;

    @OneToOne(() => Order)
    @JoinColumn()
    order: Order;
}