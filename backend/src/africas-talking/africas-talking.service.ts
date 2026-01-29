import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AfricasTalking from 'africastalking';
import { OrdersService } from '../orders/orders.service';
import { OrderStatus } from '../orders/entities/order.entity';

@Injectable()
export class AfricasTalkingService {
  private africasTalking;

  constructor(
    private readonly configService: ConfigService,
    private readonly ordersService: OrdersService,
  ) {
    this.africasTalking = AfricasTalking({
      apiKey: this.configService.get<string>('AT_API_KEY'),
      username: this.configService.get<string>('AT_USERNAME'),
    });
  }

  async sendSms(to: string, message: string) {
    try {
      const result = await this.africasTalking.SMS.send({
        to,
        message,
        from: this.configService.get<string>('AT_SENDER_ID'),
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  handleUssd(payload: any) {
    const { sessionId, phoneNumber, text } = payload;
    console.log('USSD payload received:', payload);

    let response = '';

    if (text === '') {
      // This is the first request. Note how we start the response with CON
      response = `CON What would you like to check
      1. My account
      2. My phone number`;
    } else if (text === '1') {
      // Business logic for first level response
      response = `CON Choose account information you want to view
      1. Account number
      2. Account balance`;
    } else if (text === '2') {
      // Business logic for first level response
      // This is a terminal request. Note how we start the response with END
      response = `END Your phone number is ${phoneNumber}`;
    } else if (text === '1*1') {
      // This is a second level response where the user selected 1 in the first instance
      const accountNumber = 'ACC1001';
      // This is a terminal request. Note how we start the response with END
      response = `END Your account number is ${accountNumber}`;
    } else if (text === '1*2') {
      // This is a second level response where the user selected 1 in the first instance
      const balance = 'KES 10,000';
      // This is a terminal request. Note how we start the response with END
      response = `END Your balance is ${balance}`;
    } else {
      const order = this.ordersService.findByReleaseCode(text);
      if (order) {
        this.ordersService.updateStatus(order.id, OrderStatus.DELIVERED);
        response = `END Thank you for verifying the order.`;
      } else {
        response = `END Invalid release code.`;
      }
    }

    return response;
  }
}