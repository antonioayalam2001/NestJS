import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { PRODUCT_SERVICE } from 'src/config/services';
import { envs } from 'src/config/envs';

@Module({
  controllers: [ProductController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE ,
        transport: Transport.TCP,
        options: {
          host: envs.productsMicroserviceHost , // De momento, el host es localhost
          port: envs.productsMicroservicePort // El puerto de la aplicación de productos
        }
      }
    ])
  ],
})
export class ProductModule {}
