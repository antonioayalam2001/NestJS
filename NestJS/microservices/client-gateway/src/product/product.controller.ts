import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { PRODUCT_SERVICE } from 'src/config/services';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Controller('products')
export class ProductController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
  ) { }


  @Post()
  createProduct(
    @Body() product: CreateProductDto
  ) {
    return this.productsClient.send({ cmd: 'create_product' }, product).pipe(
      catchError(err => { throw new RpcException(err) })
    )
  }

  @Get()
  getProducts(
    @Query() paginationDTO: PaginationDTO
  ) {
    //send espera la respuesta que se espera del microservicio
    //emit no espera respuesta

    // El segundo argumento es el @payload
    return this.productsClient.send({ cmd: 'get_all_products' }, {
      ...paginationDTO
    })
  }

  @Get(":id")
  async getOneProduct(
    @Param('id') id: string
  ) {

    return this.productsClient.send({ cmd: 'get_one_product' }, { id }).pipe(
      catchError(err => { throw new RpcException(err) })
    )
    /*     try {
          const product = await firstValueFrom(this.productsClient.send({ cmd: 'get_one_product' }, {
            id
          }))
          return product
        } catch (error) {
          // Se manda este tipo de exception para que nuestro custom exception filter pueda manejarlo ya que lo detecta y depende de lo que ese filtro (creado por nosotros) responda será lo que se muestre en la respuesta
          console.log(error);
          throw new RpcException(error)
        } */
  }

  @Patch(":id")
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductDto
  ) {
    return this.productsClient.send({ cmd: 'update_product' }, {
      ...product,
      id
    }).pipe(
      catchError(err => { throw new RpcException(err) })
    )
  }

  @Delete(":id")
  deleteProduct(
    @Param('id') id: string
  ) {
    return this.productsClient.send({ cmd: 'delete_product' }, {
      id
    })
  }
}