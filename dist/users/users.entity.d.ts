import { Order } from 'src/orders/orders.entity';
export declare class User {
    id: number;
    userName: string;
    email: string;
    password: string;
    address: string;
    order: Order;
}
