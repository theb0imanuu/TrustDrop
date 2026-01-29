import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderStatus } from './entities/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: { customerPhoneNumber: string }) {
    return this.ordersService.create(createOrderDto.customerPhoneNumber);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id/dispatch')
  dispatch(@Param('id') id: string) {
    // This will trigger the SMS to be sent to the customer
    // We will implement this later
    return this.ordersService.updateStatus(+id, OrderStatus.DISPATCHED);
  }
}