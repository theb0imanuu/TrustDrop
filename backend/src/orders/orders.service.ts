import { Injectable } from '@nestjs/common';
import { Order, OrderStatus } from './entities/order.entity';

@Injectable()
export class OrdersService {
  private readonly orders: Order[] = [];
  private idCounter = 1;

  create(customerPhoneNumber: string): Order {
    const order: Order = {
      id: this.idCounter++,
      customerPhoneNumber,
      releaseCode: this.generateReleaseCode(),
      status: OrderStatus.PENDING,
    };
    this.orders.push(order);
    return order;
  }

  findAll(): Order[] {
    return this.orders;
  }

  findOne(id: number): Order | undefined {
    return this.orders.find((order) => order.id === id);
  }

  updateStatus(id: number, status: OrderStatus): Order | undefined {
    const order = this.findOne(id);
    if (order) {
      order.status = status;
    }
    return order;
  }

  findByReleaseCode(releaseCode: string): Order | undefined {
    return this.orders.find((order) => order.releaseCode === releaseCode);
  }

  private generateReleaseCode(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
}