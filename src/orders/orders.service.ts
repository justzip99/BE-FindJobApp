import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { Repository } from 'typeorm';
import { CustomerOrder } from './customerorder.dto';
import { User } from 'src/users/users.entity';
@Injectable()
export class OrdersService {
    constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,
                @InjectRepository(User) private userRepository: Repository<User>) {}

     addOrder(orderInfo: CustomerOrder, id: number) {
        const user = this.userRepository.findOneBy({id});
        if(!user) {
            throw new NotFoundException("User not found.Cannot create order");
        }
        
        const newOrder = this.orderRepository.create(orderInfo);
        const savedOrder = this.orderRepository.save(newOrder);
    }

    updateOrder(id: number, updateOrderDetails: CustomerOrder) {
        return this.orderRepository.update({id}, updateOrderDetails);
    }

    deleteOrder(id: number) {
        return this.orderRepository.delete(id);
    }

    findOrders() {
        return this.orderRepository.find();
    }

    findOneOrder(id: number) {
        return this.orderRepository.findOne({where: {id}});
    }
}
