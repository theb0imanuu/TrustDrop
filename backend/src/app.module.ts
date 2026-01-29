import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { AfricasTalkingModule } from './africas-talking/africas-talking.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OrdersModule,
    AfricasTalkingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}