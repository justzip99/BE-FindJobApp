import { Order } from './orders.entity';
import { Repository } from 'typeorm';
import { CustomerOrder } from './customerorder.dto';
import { User } from 'src/users/users.entity';
export declare class OrdersService {
    private orderRepository;
    private userRepository;
    constructor(orderRepository: Repository<Order>, userRepository: Repository<User>);
    addOrder(orderInfo: CustomerOrder, id: number): void;
    updateOrder(id: number, updateOrderDetails: CustomerOrder): Promise<import("typeorm").UpdateResult>;
    deleteOrder(id: number): Promise<import("typeorm").DeleteResult>;
    findOrders(): Promise<Order[]>;
    findOneOrder(id: number): Promise<Order>;
}
