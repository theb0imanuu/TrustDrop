import { Module } from '@nestjs/common';
import { AfricasTalkingController } from './africas-talking.controller';
import { AfricasTalkingService } from './africas-talking.service';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [OrdersModule],
  controllers: [AfricasTalkingController],
  providers: [AfricasTalkingService],
})
export class AfricasTalkingModule {}