import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  // @Post() => Ya no funciona como API REST sino como microservicio
  @MessagePattern({ cmd: 'create_product' })
  // cmd: cmd es el nombre del comando que se va a enviar desde el cliente
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // @Get()
  @MessagePattern({ cmd: 'get_all_products' })
  findAll(
    @Payload() pagination : PaginationDTO // {limit: 10, page: 1}
  ) {
    return this.productsService.findAll(pagination);
  }

  // @Get(':id')
  @MessagePattern({ cmd: 'get_one_product' })
  findOne(@Payload('id') id: string) { // id: id es el nombre del parametro que se va a recibir = {id : 10}
    return this.productsService.findOne(+id);
  }

  // @Patch(':id')
  @MessagePattern({ cmd: 'update_product' })
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+updateProductDto.id, updateProductDto);
  }

  // @Delete(':id')
  @MessagePattern({ cmd: 'delete_product' })
  remove(@Payload('id') id: string) {
    return this.productsService.remove(+id);
  }
}
