import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CustomerOrder } from './customerorder.dto';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}
    
    @Post('add')
    addOrder(@Body() orderInfo: CustomerOrder, @Param('id', ParseIntPipe) id: number) {
        
        return this.ordersService.addOrder(orderInfo, id);
    }

    @Put(':id')
    updateOrder(@Body() orderInfo: CustomerOrder,@Param('id',ParseIntPipe) id: number) {
        return this.ordersService.updateOrder(id, orderInfo);
    }

    @Delete()
    deleteOrder(@Param('id', ParseIntPipe) id: number) {
        return this.ordersService.deleteOrder(id);
    }

    @Get('all')
    findOrders() {
        return this.ordersService.findOrders();
    }

    @Get(':id')
    findOneOrder(@Param('id', ParseIntPipe) id: number) {
        return this.ordersService.findOneOrder(id);
    }
}
