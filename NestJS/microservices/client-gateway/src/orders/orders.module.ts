import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDERS_SERVICE } from 'src/config/services';
import { envs } from 'src/config/envs';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: ORDERS_SERVICE ,
        transport: Transport.TCP,
        options: {
          host: envs.ordersMicroserviceHost , // De momento, el host es localhost
          port: envs.ordersMicroservicePort // El puerto de la aplicación de productos
        }
      }
    ])
  ],
})
export class OrdersModule {}
